import { Injectable } from '@angular/core';
import { BackendRouteConfiguration } from '../config/backend.route.configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessLogicService {

  urlLogic: string = BackendRouteConfiguration.urlBusinessLogic;

  constructor(private http: HttpClient) {}

  RegisterPublicUser(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlLogic}client-sign-up`, data);
  }

  RegisterPublicAdviser(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlLogic}advisor-sign-up`, data);
  }
}
