import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [
    './pages.component.css',
  ]
})
export class PagesComponent implements OnInit {
  page_title = "Admin manager";
  add_link : any   = "/add";
  constructor() { }
  ngOnInit() {

  }
  
}
