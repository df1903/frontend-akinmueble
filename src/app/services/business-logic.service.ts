import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.model';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/ContactForm.model';
import { RoutesBackendConfig } from '../config/routes-backend.config';
import { AdviserModel } from '../models/Adviser.model';
import { ClientModel } from '../models/Client.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessLogicService {
  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  constructor(private http: HttpClient) {}

  RegisterPublicUser(data: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.urlLogic}/client-sign-up`, data);
  }

  RegisterPublicAdviser(data: AdviserModel): Observable<AdviserModel> {
    console.log(data);
    console.log(`${this.urlLogic}/adviser-sign-up`);
    return this.http.post<AdviserModel>(
      `${this.urlLogic}/adviser-sign-up`,
      data
    );
  }

  SendContactForm(data: ContactFormModel): Observable<ContactFormModel> {
    return this.http.post<UserModel>(`${this.urlLogic}/contact-form`, data);
  }
}
