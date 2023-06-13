import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getClients(filter: any): Observable<any> {
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/client?filter=${queryParams.toString()}`)
  }
}
