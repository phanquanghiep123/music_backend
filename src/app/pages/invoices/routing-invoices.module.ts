import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { InvoicesComponent } from './invoices.component';
import { AuthBackend } from '../../securites/AuthBackend';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthBackend],
    children: [
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingInvoicesModule {

}
