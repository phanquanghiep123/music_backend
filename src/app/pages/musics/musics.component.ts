import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../models/service';
import { Music } from '../../models/music';
import { MusicService } from '../../services/music.service';
import { PagesComponent } from '../pages.component';
@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.css']
})
export class MusicsComponent implements OnInit {
  page_title = "Manage Musics"
  add_link = "/musics/add";;
  musics: Music[];
  service: Service;
  constructor(private musicService: MusicService, private pagesComponent: PagesComponent) {
    this.pagesComponent.page_title = this.page_title;
    this.pagesComponent.add_link = this.add_link;
  }
  ngOnInit() {
    this.musicService.gets().subscribe(service => {
      this.service = service;
      if (this.service.status) {
        this.musics = this.service.response;
        console.log(this);
      }
    })
  }

}
