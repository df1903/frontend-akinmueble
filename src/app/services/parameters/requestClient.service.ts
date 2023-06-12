import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { RequestClientModel } from 'src/app/models/RequestClient.model';

@Injectable({
  providedIn: 'root'
})
export class RequestClientService {
  
  constructor(private http: HttpClient) { }

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getRequestClient(filter: any): Observable<any> {
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/requests?filter=${queryParams.toString()}/client`)
  }

  createRequestClient(p: RequestClientModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/requests`, p);
  }

  editRequestClient(data: RequestClientModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlLogic}/requests/${data.id}`, data)
  }

  deleteRequestClient(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/requests/${id}`)
  }
}
