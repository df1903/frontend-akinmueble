import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { RequestModel } from 'src/app/models/Request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getRequests(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/request?filter=${queryParams.toString()}`
    );
  }

  createRequest(p: RequestModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/request`, p);
  }

  editRequest(data: RequestModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlLogic}/request/${data.id}`, data);
  }

  deleteRequest(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/request/${id}`);
  }
}
