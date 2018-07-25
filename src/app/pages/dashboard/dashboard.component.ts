import { Component, OnInit, Input } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private app: AppComponent,private pagesComponent: PagesComponent) {
    this.pagesComponent.add_link = false;
    this.pagesComponent.page_title = 'Admin Manage';
  }
  ngOnInit() {
    setTimeout(() => {
      this.app.loading = false;
    }, 200);
  }
  ngOnDestroy(): void {
    this.app.loading = true; 
    window.scrollTo(0, 0);
  }

}
