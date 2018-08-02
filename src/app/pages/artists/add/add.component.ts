import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { PagesComponent } from '../../pages.component';
import { Artist } from '../../../models/artist';
import { ArtistService } from '../../../services/artist.service';
import { Service } from '../../../models/service';
import { Router } from '@angular/router';
import { Music } from '../../../models/music';
import { first } from 'rxjs/operators';
import { AppComponent } from '../../../app.component';
import { Currency } from '../../../models/currency';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  page_title = "Add new Artist";
  add_link = false;
  artist: Artist;
  service: Service;
  musics: Music[];
  currencys: Currency[];
  isSubmit = 0;
  @ViewChild('avatarInput') avatarInput: ElementRef;
  constructor(
    private router: Router,
    private location: Location,
    private pagesComponent: PagesComponent,
    private artistService: ArtistService,
    private app: AppComponent
  ) {
    this.pagesComponent.add_link = this.add_link;
    this.pagesComponent.page_title = this.page_title;

  }
  ngOnInit() {
    this.artistService.create().subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.currencys = this.service.response;
        this.artist = new Artist();
        this.app.loading = false;
      }
    }, error => {
      this.app.loading = false;
    });
  }
  OnSubmit(formData) {
    this.isSubmit = 1;
    if (formData.form.status != 'VALID') {
      window.scrollTo(0, 0);
      return false;
    }
    this.app.loading = true;
    let from = new FormData();
    for (let item in this.artist) {
      if (item == "avatar") {
        from.append("avatarFile", this.avatarInput.nativeElement.files[0]);
      } else {
        if (item == "date_of_birth" || item == "begin_date" || item == "end_date") {
          from.append(item, this.formatDate(this.artist[item]));
        } else {
          from.append(item, this.artist[item]);
        }
      }
    }
    this.artistService.store(from).pipe(first()).subscribe(
      data => {
        this.service = data;
        if (this.service.status) {
          this.artist = this.service.response;
          this.router.navigateByUrl('/artists/edit/' + this.artist.id);
        } else {
          this.app.loading = false;
        }
      }, error => {
        this.app.loading = false;
      }
    );
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
  ngOnDestroy(): void {
    this.app.loading = true;
    window.scrollTo(0, 0);
  }
  changThumbartists(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var file = target.files[0];
    var _this = this;
    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        _this.artist.avatar = this.result;
      }, false);
      reader.readAsDataURL(file);
    }
  }
}