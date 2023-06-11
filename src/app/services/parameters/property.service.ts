import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagerConfig } from 'src/app/config/pager.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PhotoModel } from 'src/app/models/Photo.model';
import { PropertyModel } from 'src/app/models/Property.model';

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
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/public-property?filter=${queryParams.toString()}`)
  }

  getPhotos(filter: any): Observable<any> {
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/photo?filter=${queryParams}`)
  }

  createProperty(p : PropertyModel): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/property`, p)
  }

  uploadPhoto(photo: FormData): Observable<any> {
    return this.http.post<boolean>(`${this.urlLogic}/upload-property-file`, photo)
  }

  getPhoto(fileName: any) {
    return this.http.get<boolean>(`${this.urlLogic}/GetFiles/1/${fileName}`)
  }

  createPhoto(photos: PhotoModel) {
    return this.http.post<boolean>(`${this.urlLogic}/photo`, photos)
  }

  getPropertyTypes(filter: any): Observable<any> {
    let queryParams = ""
    if (filter != "") {
      queryParams = JSON.stringify(filter);
    }
    return this.http.get<boolean>(`${this.urlLogic}/property-type?filter=${queryParams.toString()}`)
  }

  editProperty(data: PropertyModel): Observable<any> {
    return this.http.put<boolean>(`${this.urlLogic}/property/${data.id}`, data)
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/property/${id}`)
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.urlLogic}/photo/${id}`)
  }
}
