import { Injectable } from '@angular/core';
import { UserModel } from '../models/User.model';
import { HttpClient } from '@angular/common/http';
import { RoutesBackendConfig } from '../config/routes-backend.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserValidatedModel } from '../models/UserValidated.model copy';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  urlSecurity: string = RoutesBackendConfig.urlSecurity;
  constructor(private http: HttpClient) {
    this.sessionValidation();
  }

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
   * Store user data in Local Storage
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

  userCodeVerification(
    userId: string,
    code: string
  ): Observable<UserValidatedModel> {
    return this.http.post<UserValidatedModel>(
      `${this.urlSecurity}/code-verification`,
      {
        userId: userId,
        code2FA: code,
      }
    );
  }

  /**
   * Store user validated data in Local Storage
   * @param data
   * @returns
   */
  storeUserValidatedData(data: UserValidatedModel): boolean {
    let userData = JSON.stringify(data);
    let localStorageData = localStorage.getItem('session-data');
    if (localStorageData != null) {
      return false;
    } else {
      localStorage.setItem('session-data', userData);
      return true;
    }
  }

  /** SESSION ADMINISTRATION */

  userValidatedData = new BehaviorSubject<UserValidatedModel>(
    new UserValidatedModel()
  );
  getSessionData(): Observable<UserValidatedModel> {
    return this.userValidatedData.asObservable();
  }

  sessionValidation() {
    let ls = localStorage.getItem('session-data');
    if (ls) {
      let objUser = JSON.parse(ls);
      this.updateUserBehavior(objUser);
    }
  }

  updateUserBehavior(data: UserValidatedModel) {
    return this.userValidatedData.next(data);
  }
}
