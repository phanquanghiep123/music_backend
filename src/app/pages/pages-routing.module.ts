import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { AuthBackend } from '../securites/AuthBackend';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthBackend],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
        canActivate: [AuthBackend],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {

}


