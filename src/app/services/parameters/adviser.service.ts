import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';

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
