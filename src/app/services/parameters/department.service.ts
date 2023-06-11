import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { DepartmentModel } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getDepartments(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/department?filter=${queryParams.toString()}`
    );
  }

  createDepartment(p: DepartmentModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/department`, p);
  }

  editDepartment(data: DepartmentModel): Observable<any> {
    return this.http.put<boolean>(
      `${this.urlLogic}/department/${data.id}`,
      data
    );
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/department/${id}`);
  }
}
