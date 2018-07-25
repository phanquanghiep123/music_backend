import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit.component';
import { UimusicsDirective } from './directives/uimusics.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [AddComponent, EditComponent,UimusicsDirective],
  providers : []
})
export class ArtistsModule { }
