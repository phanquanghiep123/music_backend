import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { PagesComponent } from '../pages.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthBackend } from '../../securites/AuthBackend';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthBackend],
    children: [
      {
        path: 'artists',
        component: ArtistsComponent,
      },
      {
        path: 'artists/add',
        component: AddComponent,
      },
      {
        path: 'artists/edit/:id',
        component: EditComponent,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule {

}
