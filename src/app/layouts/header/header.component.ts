import { Component, OnInit } from '@angular/core';
import { Auth } from '../../models/auth'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router : Router,private auth : Auth) { }
  ngOnInit() {}
  Logout() {
    this.auth.destroy();
    this.router.navigate(['/login']);
  }
}