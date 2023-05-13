import { Injectable } from '@angular/core';
import { UserModel } from '../models/User.model';
import { HttpClient } from '@angular/common/http';
import { RoutesBackendConfig } from '../config/routes-backend.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  urlSecurity: string = RoutesBackendConfig.urlSecurity;
  constructor(private http: HttpClient) {}

  /**
   * Login User
   * @param user
   * @param password
   * @returns User Data
   */
  userLogin(user: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlSecurity}/login-user`, {
      email: user,
      password: password,
    });
  }

  /**
   * Store user data
   * @param data
   */
  storeUserData(data: UserModel): boolean {
    let userData = JSON.stringify(data);
    let localStorageData = localStorage.getItem('user-data');
    if (localStorageData) {
      return false;
    } else {
      localStorage.setItem('user-data', userData);
      return true;
    }
  }

  /**
   * Get user data in Local Storage
   * @returns user data
   */
  getUserData(): UserModel | null {
    let localStorageData = localStorage.getItem('user-data');
    if (localStorageData) {
      let data = JSON.parse(localStorageData);
      return data;
    } else {
      return null;
    }
  }

  userCodeVerification(userId: string, code: string): Observable<object> {
    return this.http.post<UserModel>(`${this.urlSecurity}/code-verification`, {
      userId: userId,
      code2FA: code,
    });
  }
}
