import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicsRoutingModule } from './/musics-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusicsComponent } from './musics.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  imports: [
    CommonModule,
    MusicsRoutingModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  declarations: [AddComponent, MusicsComponent, EditComponent],
  providers : []
})
export class MusicsModule { }
