import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PropertyTypeModel } from 'src/app/models/propertyType.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyTypeService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getPropertyTypes(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/property-type?filter=${queryParams.toString()}`
    );
  }

  createPropertyTypes(p: PropertyTypeModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/property-type`, p);
  }

  editPropertyTypes(data: PropertyTypeModel): Observable<any> {
    return this.http.put<boolean>(
      `${this.urlLogic}/property-type/${data.id}`,
      data
    );
  }

  deletePropertyTypes(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/property-type/${id}`);
  }
}
