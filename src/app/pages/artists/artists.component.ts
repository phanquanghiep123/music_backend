import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../models/service';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { PagesComponent } from '../pages.component';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  page_title = 'Manage Artists';
  add_link = '/artists/add';
  artists: Artist[];
  service: Service;
  constructor(
    private artistService: ArtistService,
    private pagesComponent: PagesComponent,
    private app: AppComponent
  ) {
    this.pagesComponent.page_title = this.page_title;
    this.pagesComponent.add_link = this.add_link;
  }
  ngOnInit() {
    this.artistService.gets().subscribe(
      service => {
        this.service = service;
        if (this.service.status == true) {
          this.artists = this.service.response;
        }
        this.app.loading = false;
      }, error => {
        this.app.loading = false;
      }
    );
  }
  Delete(index: number, item: Artist) {
    this.app.loading = true;
    if (confirm("Are you sure to delete " + item.name)) {
      this.artistService.destroy(item.id).subscribe(
        data => {
          this.artists.splice(index, 1);
          this.app.loading = false;
        }, error => {
          this.app.loading = false;
        }
      );
    }
    return false;
  }
  ngOnDestroy(): void {
    this.app.loading = true;
    window.scrollTo(0, 0);
  }
}
