import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getRequests(filter: any): Observable<any> {
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/request?filter=${queryParams.toString()}`)
  }
}
