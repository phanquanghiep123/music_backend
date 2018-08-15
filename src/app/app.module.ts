import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { Auth } from './models/auth';
import { FormsModule } from '@angular/forms';
import { AuthBackend } from './securites/AuthBackend';
import { BackendIsLogin } from './securites/BackendIsLogin';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PagesModule } from './pages/pages.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './layouts/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
   
  ],
  exports: [
    HttpModule,
    CommonModule,
  ],
  providers: [
    Auth,
    AuthBackend,
    BackendIsLogin,
    HttpClient
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

