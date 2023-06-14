import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { GuarantorModel } from 'src/app/models/Guarantor.model';

@Injectable({
  providedIn: 'root',
})
export class GuarantorService {
  constructor(private http: HttpClient) {}

  urlLogic: string = RoutesBackendConfig.urlBusinessLogic;

  getGuarantor(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlLogic}/guarantor?filter=${queryParams.toString()}/client`
    );
  }

  createGuarantor(p: GuarantorModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/guarantor`, p);
  }

  editGuarantor(data: GuarantorModel): Observable<any> {
    return this.http.put<boolean>(
      `${this.urlLogic}/guarantor/${data.id}`,
      data
    );
  }

  deleteGuarantor(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/guarantor/${id}`);
  }
}
