import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { PagerConfig } from 'src/app/config/page.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { ContractsModel } from 'src/app/models/Contract.model';
import { ModelFile } from 'src/app/models/ModelFile.model';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  urlBase: string = RoutesBackendConfig.urlBusinessLogic;
  constructor(private http: HttpClient) {}

  getAllContracts(pag: number): Observable<any> {
    let limit = PagerConfig.recordPerPage;
    let skip = (pag - 1) * limit;
    return this.http.get<boolean>(
      `${this.urlBase}/contract?filter={"skip":${skip},"limit":${limit}}`
    );
  }

  getContracts(filter: any): Observable<any> {
    let queryParams = '';
    if (filter != '') {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(
      `${this.urlBase}/contract?filter=${queryParams.toString()}`
    );
  }

  createcontract(p: ContractsModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlBase}/contract`, p);
  }

  uploadFile(file: FormData): Observable<any> {
    return this.http.post<boolean>(
      `${this.urlBase}/upload-contract-file`,
      file
    );
  }

  editcontract(data: ContractsModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlBase}/contract/${data.id}`, data);
  }

  deletecontract(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlBase}/contract/${id}`);
  }

  downloadContract(type: number, name: string): Observable<any> {
    const url = `${
      this.urlBase
    }/GetFiles/${type}/${name}?timestamp=${Date.now()}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((data: any) => {
        this.downloadFile(data, name);
      })
    );
  }

  private downloadFile(data: any, fileName: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
