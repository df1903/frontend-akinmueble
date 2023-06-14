import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { CityModel } from 'src/app/models/City.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getCities(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/city?filter=${queryParams.toString()}`
    );
  }

  createCity(p: CityModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/city`, p);
  }

  editCity(data: CityModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlLogic}/city/${data.id}`, data);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/city/${id}`);
  }
}
