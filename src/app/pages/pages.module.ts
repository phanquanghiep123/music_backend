import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './/pages-routing.module';
import { PagesComponent } from '../pages/pages.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsModule } from './artists/artists.module';
import { MusicsModule } from './musics/musics.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    HttpModule,
    ArtistsModule,
    MusicsModule
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ArtistsComponent
  ]
})
export class PagesModule { }
