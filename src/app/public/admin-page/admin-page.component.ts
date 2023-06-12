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
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  user: UserModel = new UserModel();

  properties: number = 0;
  propertiesToRent: number = 0;
  propertiesToSell: number = 0;
  requests: number = 0;
  requestsAccepted: number = 0;
  requestsRejected: number = 0;
  requestsGuarantor: number = 0;
  requestsPending: number = 0;
  requestsStudy: number = 0;
  clients: number = 0;
  advisers: number = 0;

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
          if (this.user.roleId != RolesConfig.administratorId) {
            this.router.navigate(['/adviser-page']);
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

        this.propertiesToSell = saleProperties.length;
        this.propertiesToRent = rentedProperties.length;
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
    let filter = {};
    this.requestSvc.getRequests(filter).subscribe({
      next: (data: any) => {
        let requestsPending: any[] = data.records.filter(
          (requests: any) => requests.requestStatusId == 1
        );
        let requestsStudy: any[] = data.records.filter(
          (requests: any) => requests.requestStatusId == 2
        );
        let requestsAccepted: any[] = data.records.filter(
          (requests: any) => requests.requestStatusId == 3
        );
        let requestsRejected: any[] = data.records.filter(
          (requests: any) => requests.requestStatusId == 4
        );
        let requestsGuarantor: any[] = data.records.filter(
          (requests: any) => requests.requestStatusId == 1
        );
        console.log(requestsAccepted);
        this.requests = data.records.length;
        this.requestsPending = requestsPending.length;
        this.requestsStudy = requestsStudy.length;
        this.requestsAccepted = requestsAccepted.length;
        this.requestsRejected = requestsRejected.length;
        this.requestsGuarantor = requestsGuarantor.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
