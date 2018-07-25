import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PagesComponent } from '../pages.component';
import {AuthBackend} from '../../securites/AuthBackend';
const routes: Routes = [
  {
    path: '',
    component : PagesComponent,
    canActivate :[AuthBackend],
    children :[
      {
        path : '',
        pathMatch : 'full',
        redirectTo: 'dashboard',
        canActivate :[AuthBackend],
      },
      {
        path : 'dashboard',
        component : DashboardComponent,
      } 
    ]
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingDashboardModule {

}

