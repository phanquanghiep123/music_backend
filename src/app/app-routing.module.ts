import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {BackendIsLogin} from './securites/BackendIsLogin';
import {AuthBackend} from './securites/AuthBackend';
import {PagesComponent} from './pages/pages.component';
const routes: Routes = [
  { path: 'login',component : LoginComponent,canActivate:[BackendIsLogin]},
  { path: '',component : PagesComponent ,canActivate : [AuthBackend]},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
