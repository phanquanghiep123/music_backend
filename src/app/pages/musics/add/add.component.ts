import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import { PagesComponent } from '../../pages.component';
import { Music } from '../../../models/music';
import { Artist } from '../../../models/artist';
import { MusicService } from '../../../services/music.service';
import {Service} from '../../../models/service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  page_title = "Add new Artist";
  add_link = false;
  music: Music;
  service : Service;
  artists : Artist[];
  @ViewChild('pathFile') pathFile: ElementRef;
  @ViewChild('thumbFile') thumbFile: ElementRef;
  constructor(private router : Router,private location: Location,private pagesComponent: PagesComponent, private musicService: MusicService) {
    this.pagesComponent.add_link = this.add_link;
    this.pagesComponent.page_title = this.page_title;
  }
  ngOnInit() {
    this.music = new Music();
    this.musicService.create().subscribe(data => {
      this.service = data;
      if(this.service.status){
        this.artists  = this.service.response;
      }
    })
    
  }
  OnSubmit() {
    let from = new FormData();
    for (let item in this.music){
      if(item == "path"){
        from.append("pathFile",this.pathFile.nativeElement.files[0]);
      }else if(item == "thumb"){
        from.append("thumbFile",this.thumbFile.nativeElement.files[0]);
      }
      else{
        if(item == "day_of_creation"){
          from.append(item, this.formatDate(this.music[item]));
        }else{
          from.append(item,this.music[item]);
        }
      }
    }
    this.music.pathFile = this.pathFile.nativeElement.files[0];
    this.music.thumbFile = this.thumbFile.nativeElement.files[0];
    this.musicService.add(from).pipe(first()).subscribe(data => {
      this.service = data;
      if(this.service.status){
        this.music = this.service.response;
        this.router.navigateByUrl('/musics/edit/'+ this.music.id);
      }
    });
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
}