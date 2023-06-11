import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { ClientService } from 'src/app/services/parameters/client.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-adviser-page',
  templateUrl: './adviser-page.component.html',
  styleUrls: ['./adviser-page.component.css'],
})
export class AdviserPageComponent {
  user: UserModel = new UserModel();

  properties: number = 0;
  clients: number = 0;
  sale_properties: number = 0;
  rented_properties: number = 0;
  advisers: number = 0;
  requests: number = 0;

  constructor(
    private securityService: SecurityService,
    private propertySvc: PropertyService,
    private clientSvc: ClientService,
    private adviserSvc: AdviserService,
    private requestSvc: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionValidation();
    this.getProperties();
    this.getClient();
    this.getAdvisers();
    this.getRequests();
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.user = data.user!;
          if (this.user.roleId != RolesConfig.adviserId) {
            this.router.navigate([""]);
          }
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getProperties() {
    this.propertySvc.getProperties('').subscribe({
      next: (properties: any) => {
        let saleProperties: any[] = properties.records.filter(
          (property: any) => property.sell === true
        );

        let rentedProperties = properties.records.filter(
          (property: any) => property.rent === true
        );

        this.sale_properties = saleProperties.length;
        this.rented_properties = rentedProperties.length;
        this.properties = properties.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getClient() {
    this.clientSvc.getClients('').subscribe({
      next: (data: any) => {
        this.clients = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getAdvisers() {
    let filter = {
      where: {
        accepted: 1,
      },
    };
    this.adviserSvc.getAdvisers(filter).subscribe({
      next: (data: any) => {
        this.advisers = data.records.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getRequests() {
    let filter = {
      where: {
        or: [{ requestStatusId: 4 }, { requestStatusId: 5 }],
      },
    };
    this.requestSvc.getRequests(filter).subscribe({
      next: (data: any) => {
        this.requests = data.records.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
