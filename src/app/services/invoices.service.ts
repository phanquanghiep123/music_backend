
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Observable, of } from 'rxjs';
import { Auth } from '../models/auth';
import { Invoice } from '../models/invoice';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  controller = "invoices";
  httpOptions = {};
  constructor(private http: HttpClient, private auth: Auth) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  gets($page = 1,$model?: {}): Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + "/gets",{page : $page ,model : $model} , this.httpOptions);
  }
  get ($id : any = 0) : Observable<Service>{
    return this.http.post<Service>(Config.APIURL + this.controller + "/edit", {"id" : $id} , this.httpOptions);
  }
  create(): Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + "/create",[], this.httpOptions);
  }
  store($model: FormData): Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + "/store", $model, this.httpOptions);
  }
  update ($model :FormData) : Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + "/update", $model, this.httpOptions);
  }
  destroy ($id:number){
    return this.http.post<Service>(Config.APIURL + this.controller + "/destroy",{id : $id }, this.httpOptions);
  }
}
