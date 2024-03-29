import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RolesConfig } from 'src/app/config/roles.config';
import { ItemMenuModel } from 'src/app/models/ItemMenu.model';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  activeSession: boolean = false;
  isExpanded: boolean = false;
  dropdownStates: boolean[] = [];
  user: UserModel = new UserModel();

  menuPersonalOptions: ItemMenuModel[] = [
    {
      label: 'My Profile',
      route: '/security/profile-user',
      icon: 'account_circle',
    },
  ];

  menuSiteOptions: ItemMenuModel[] = [];

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
    this.sessionValidation();
    this.getPersonalMenu();
  }

  getPersonalMenu() {
    if (this.user.roleId == RolesConfig.administratorId) {
      this.menuPersonalOptions.push({
        label: 'Managment',
        route: '/admin-page',
        icon: 'account_circle',
      });
    }
    if (this.user.roleId == RolesConfig.adviserId) {
      this.menuPersonalOptions.push({
        label: 'Managment',
        route: '/adviser-page',
        icon: 'account_circle',
      });
    }
    if (this.user.roleId == RolesConfig.clientId) {
      this.menuPersonalOptions.push({
        label: 'Managment',
        route: '/client-page',
        icon: 'account_circle',
      });
    }
  }

  toggleMenuExpansion(event: Event) {
    console.log('Opening...');
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
    this.moveButtonWithMenu();
    this.menuSiteOptions = this.securityService.getSideMenuItems();
  }

  moveButtonWithMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuWidth = sideMenu?.offsetWidth;

    if (this.isExpanded) {
      sideMenu!.style.transform = 'translateX(0)';
      menuToggle!.style.transform = `translateX(${menuWidth}px)`;
    } else {
      sideMenu!.style.transform = 'translateX(-250px)';
      menuToggle!.style.transform = 'translateX(0)';
    }
  }

  ngAfterViewInit() {
    M.Sidenav.init(document.getElementById('side-menu'));
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.activeSession = true;
          this.user = data.user!;
          this.moveButtonWithMenu();
        } else {
          this.activeSession = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
