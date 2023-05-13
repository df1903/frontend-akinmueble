import { Injectable } from '@angular/core';
import { BackendRouteConfiguration } from '../config/backend.route.configuration';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {
  
  urlLogic:string = BackendRouteConfiguration.urlBusinessLogic

  constructor( private http : HttpClient) { }


  RegisterPublicUser(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.urlLogic}client-sign-up`,data);
  }
}
