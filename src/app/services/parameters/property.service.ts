import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagerConfig } from 'src/app/config/pager.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getAllProperties(pag: number): Observable<any> {
    let limit = PagerConfig.recordPerPage;
    let skip = (pag - 1) * limit;
    return this.http.get<boolean>(`${this.urlLogic}/public-property?filter={"skip":${skip},"limit":${limit}}`)
  }

  getProperties(filter: any): Observable<any> {
    let queryParams = JSON.stringify(filter);
    return this.http.get<boolean>(`${this.urlLogic}/public-property?filter=${queryParams.toString()}`)
  }

  getPhotos(): Observable<any> {
    return this.http.get<boolean>(`${this.urlLogic}/photo`)
  }
}
