import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.model';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/ContactForm.model';
import { RoutesBackendConfig } from '../config/routes-backend.config';

@Injectable({
  providedIn: 'root',
})
export class BusinessLogicService {
  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  constructor(private http: HttpClient) {}

  RegisterPublicUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlLogic}/client-sign-up`, data);
  }

  RegisterPublicAdviser(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlLogic}/adviser-sign-up`, data);
  }

  SendContactForm(data: ContactFormModel): Observable<ContactFormModel> {
    return this.http.post<ContactFormModel>(
      `${this.urlLogic}/contact-form`,
      data
    );
  }
}
