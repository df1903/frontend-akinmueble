import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/ContactForm.model';
import { RoutesBackendConfig } from '../config/routes-backend.config';
import { PagerConfig } from '../config/pager.config';
import { ChangeContactModel } from '../models/ChangeContact.model';

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

  hashVerification(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlLogic}/validate-client-hash`, {
      hashCode: hash,
    });
  }

  getGeneralVariables(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${
        this.urlLogic
      }/general-system-variables?filter=${queryParams.toString()}`
    );
  }

  changeGeneralVariables(data: ChangeContactModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/editAdminContact`, data);
  }
}
