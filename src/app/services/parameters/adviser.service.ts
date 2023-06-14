import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/adviser.model';

@Injectable({
  providedIn: 'root',
})
export class AdviserService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getAdvisers(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/adviser?filter=${queryParams.toString()}`
    );
  }

  createAdviser(p: AdviserModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/adviser`, p);
  }

  editAdviser(data: AdviserModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlLogic}/adviser/${data.id}`, data);
  }

  deleteAdviser(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/adviser/${id}`);
  }

  responseAdviser(id: number, status: boolean): Observable<any> {
    let res = {
      adviserId: id,
      accepted: status,
    };
    return this.http.post<boolean>(
      `${this.urlLogic}/adviser-request-response`,
      res
    );
  }
}
