import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../../../models/artist';
import { ArtistService } from '../../../services/artist.service';
import { Service } from '../../../models/service';
import { MusicService } from '../../../services/music.service';
import { Location } from '@angular/common';
import { PagesComponent } from '../../pages.component';
import { first } from 'rxjs/operators';
import { Music } from '../../../models/music';
import { AppComponent } from '../../../app.component';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  page_title = "Edit Artist";
  add_link = "/artists/add";
  artist: Artist;
  service: Service;
  musics: Music[] = [];
  music: Music = null;
  SoundSource = new Audio();
  UIMusics: any;
  isSubmitArtist = 1;
  isSubmitMusic = 0;
  controls = {};
  typeTracks = [
    'Pop',
    'Rock',
    'Jazz',
    'Blues',
    'R&B/Soul',
    'Hip hop',
    'Country',
    'Folk',
    'Electronic',
    'Dance',
    'Easy listening',
    'Avant-Garde',
    'Lovers'
  ]
  @ViewChild('pathFile') pathFile: ElementRef;
  @ViewChild('thumbFile') thumbFile: ElementRef;
  @ViewChild('avatarInput') avatarInput: ElementRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pagesComponent: PagesComponent,
    private artistService: ArtistService,
    private musicService: MusicService,
    private app: AppComponent,
    public sanitizer: DomSanitizer
  ) {
    this.pagesComponent.add_link = this.add_link;
    this.pagesComponent.page_title = this.page_title;
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.artistService.get(id).subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.artist = this.service.response;
        this.artist.public_avatar = this.service.public_url + this.artist.avatar;
        this.musics = this.service.response.musics;
      }
      this.app.loading = false;
    });

  }
  OnSubmit(formArtist) {
    this.isSubmitArtist = 1;
    if (formArtist.form.status != 'VALID') {
      this.controls = formArtist.form.controls;
      window.scrollTo(0, 0);
      return false;
    }
    this.app.loading = true;
    var $: any;
    let from = new FormData();
    for (let item in this.artist) {
      if (item == "avatar") {
        from.append("avatarFile", this.avatarInput.nativeElement.files[0]);
      } else {
        if (item == "date_of_birth" || item == "begin_date" || item == "end_date") {
          from.append(item, this.formatDate(this.artist[item]));
        } else {
          if(item == "prices"){
            var json_prices = JSON.stringify(this.artist[item]);
            from.append(item, json_prices);
          }else{
            from.append(item, this.artist[item]);
          }
          
        }
      }
    }
    this.artist.avatarFile = this.avatarInput.nativeElement.files[0];
    this.artistService.update(from).pipe(first()).subscribe(
      data => {
        this.service = data;
        if (this.service.status) {
          this.artist = this.service.response;
          this.artist.public_avatar = this.service.public_url + this.artist.avatar;
        }
        this.app.loading = false;
      },
      error => {
        this.app.loading = false;
      }
    );
  }
  OnSubmitMusic(formMusic) {
    this.isSubmitMusic = 1;
    if (formMusic.form.status != 'VALID') {
      window.scrollTo(0, 0);
      return false;
    }
    $("#myModal").modal("hide");
    this.app.loading = true;
    this.musics = this.musics.length == 0 ? [] : this.musics;
    let from = new FormData();
    for (let item in this.music) {
      if (item == "path") {
        from.append("pathFile", this.pathFile.nativeElement.files[0]);
      } else if (item == "thumb") {
        from.append("thumbFile", this.thumbFile.nativeElement.files[0]);
      }
      else {
        if (item == "day_of_creation") {
          from.append(item, this.formatDate(this.music[item]));
        } else {
          from.append(item, this.music[item]);
        }
      }
    }
    this.music.pathFile = this.pathFile.nativeElement.files[0];
    this.music.thumbFile = this.thumbFile.nativeElement.files[0];
    if (this.music.id > 0) {
      this.musicService.update(from).subscribe(
        data => {
          this.service = data;
          if (this.service.status) {
            this.music = this.service.response;
            for (var i in this.musics) {
              if (this.musics[i].id == this.music.id) {
                this.musics[i] = this.service.response;
              }
            }
            this.music = new Music();
            $("#myModal").modal("hide");
          }
          this.app.loading = false;
        },
        error => {
          this.app.loading = false;
        }
      );
    } else {
      this.musicService.add(from).subscribe(
        data => {
          this.service = data;
          if (this.service.status) {
            this.musics.push(this.service.response);
            $("#myModal").modal("hide");
          }
          this.app.loading = false;
        },
        error => {
          this.app.loading = false;
        }
      );
    }

  }
  addMusic() {
    try {
      this.reset();
    } catch (error) {
    }
    setTimeout(() => {
      this.isSubmitMusic = 0;
      this.music = new Music();
      this.music.artist_id = this.artist.id;
    }, 200);
  };
  EditMusic(music) {
    try {
      this.reset();
    } catch (error) {
    }
    setTimeout(() => {
      this.music = music;
      this.music.public_thumb = this.service.public_url + this.music.thumb;
      this.music.public_path = this.service.public_url + this.music.path;
      this.isSubmitMusic = 1;
    }, 200);
  }
  DeleteMusic(index, item: Music) {
    if (confirm("Are you sure to delete " + item.name)) {
      this.app.loading = true;
      this.musicService.destroy(item.id).subscribe(
        data => {
          this.musics.splice(index, 1);
          this.app.loading = false;
        },
        error => {
          this.app.loading = false;
        }
      );
    }
  }
  PlayTrack(track: Music) {
    try {
      this.SoundSource.pause();
    } catch (error) {

    }
    if (track.is_play == true) {
      track.is_play = false;
      return false;
    }
    for (var t in this.musics) {
      this.musics[t].is_play = false;
    }
    this.SoundSource.src = this.service.public_url + track.path;
    this.SoundSource.play();
    track.is_play = true;
  }
  goBack() {
    this.location.back();
  }
  private formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  ngOnDestroy() {
    try {
      this.SoundSource.pause();
    } catch (error) {

    }
    this.app.loading = true;
    window.scrollTo(0, 0);
  }
  changThumbartists(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var file = target.files[0];
    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var URL = window.URL ;
      this.artist.public_avatar = this.sanitize(URL.createObjectURL(file));
    }
  }
  changThumbmusic(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var file = target.files[0];
    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var URL = window.URL ;
      this.music.public_thumb = this.sanitize(URL.createObjectURL(file));    
    }
  }
  changAudiomusic(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var file = target.files[0];
    var URL = window.URL ;
    this.music.public_path = this.sanitize(URL.createObjectURL(file));  
  }
  reset() {
    this.thumbFile.nativeElement.value = '';
    this.pathFile.nativeElement.value = '';
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
