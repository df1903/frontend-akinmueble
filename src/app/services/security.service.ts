import { Injectable } from '@angular/core';
import { UserModel } from '../models/User.model';
import { HttpClient } from '@angular/common/http';
import { RoutesBackendConfig } from '../config/routes-backend.config';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { UserValidatedModel } from '../models/UserValidated.model';
import { PermissionsModel } from '../models/Permissions.model';
import { ItemMenuModel } from '../models/ItemMenu.model';
import { SideMenuConfig } from '../config/side-menu.config';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  urlSecurity: string = RoutesBackendConfig.urlSecurity;

  constructor(private http: HttpClient) {
    this.sessionValidation();
  }

  /** USER ADMINISTRATION */

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
      this.updateUserBehavior(data);
      return true;
    }
  }

  userRecoveryPassword(user: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlSecurity}/recovery-password`, {
      email: user,
    });
  }

  userChangePassword(op: string, np: string): Observable<boolean> {
    let ls = localStorage.getItem('session-data');
    let user = JSON.parse(ls!);
    let data = {
      id: user.user._id,
      oldPassword: op,
      newPassword: np,
    };
    return this.http.post<boolean>(`${this.urlSecurity}/change-password`, data);
  }

  /** SESSION ADMINISTRATION */

  userValidatedData = new BehaviorSubject<UserValidatedModel>(
    new UserValidatedModel()
  );

  /**
   * Get session data
   * @returns session data
   */
  getSessionData(): Observable<UserValidatedModel> {
    return this.userValidatedData.asObservable();
  }

  /**
   * Session validation with behavior update
   */
  sessionValidation(): UserValidatedModel | null {
    let ls = localStorage.getItem('session-data');
    if (ls) {
      let objUser = JSON.parse(ls);
      this.updateUserBehavior(objUser);
      return objUser;
    }
    return null;
  }

  /**
   * Update user behavior
   * @param data session data
   * @returns update behavior
   */
  updateUserBehavior(data: UserValidatedModel) {
    return this.userValidatedData.next(data);
  }

  /**
   * Remove sesion data
   */
  deleteSessionData() {
    let userData = localStorage.getItem('user-data');
    let sessionData = localStorage.getItem('session-data');
    let sideMenuData = localStorage.getItem('side-menu');
    if (userData) {
      localStorage.removeItem('user-data');
    }
    if (sessionData) {
      localStorage.removeItem('session-data');
    }
    if (sideMenuData) {
      localStorage.removeItem('side-menu');
    }
    this.updateUserBehavior(new UserValidatedModel());
  }

  /** SIDENAV MENU ADMINISTRATION */

  /**
   * Build items for the sidemenu
   * @param permissions item permissions
   */
  buildSideMenu(permissions: PermissionsModel[]) {
    let menu: ItemMenuModel[] = [];
    console.log(menu);
    permissions.forEach((permission) => {
      let routeData = SideMenuConfig.getMenus.filter(
        (x) => x.id == permission.menuId
      );
      if (routeData.length > 0) {
        let item = new ItemMenuModel();
        item.menuId = permission.menuId;
        item.route = routeData[0].route;
        item.icon = routeData[0].icon;
        item.label = routeData[0].label;
        menu.push(item);
      }
    });
    this.storeSideMenuItems(menu);
  }

  /**
   *
   * @param itemsMenu menu items to storage into Local Storage
   */
  storeSideMenuItems(itemsMenu: ItemMenuModel[]) {
    let menuStr = JSON.stringify(itemsMenu);
    localStorage.setItem('side-menu', menuStr);
  }

  /**
   *
   * @returns list with items for sidemenu
   */
  getSideMenuItems(): ItemMenuModel[] {
    let menu: ItemMenuModel[] = [];
    let menuStr = localStorage.getItem('side-menu');
    if (menuStr) {
      menu = JSON.parse(menuStr);
    }
    return menu;
  }
}
