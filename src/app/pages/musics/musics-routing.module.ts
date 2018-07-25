import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicsComponent } from './musics.component';
import { PagesComponent } from '../pages.component';
import { AddComponent } from '../musics/add/add.component';
import { EditComponent } from '../musics/edit/edit.component';
import {AuthBackend} from '../../securites/AuthBackend';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate : [AuthBackend],
    children: [
      {
        path: 'musics',
        component: MusicsComponent, 
      },
      {
        path: 'musics/add',
        component: AddComponent, 
      },
      {
        path: 'musics/edit/:id',
        component: EditComponent, 
      }
       
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicsRoutingModule {

}
