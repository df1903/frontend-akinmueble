import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { PropertyModel } from 'src/app/models/Property.model';
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
  adviserId: number = 0;

  properties: number = 0;
  propertiesMine: number = 0;
  requests: number = 0;
  requestsAccepted: number = 0;
  requestsRejected: number = 0;
  requestsGuarantor: number = 0;
  requestsPending: number = 0;
  requestsStudy: number = 0;
  clients: number = 0;

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
    this.getRequests();
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.user = data.user!;
          this.adviserId = this.user.accountId!;
          if (this.user.roleId != RolesConfig.adviserId) {
            this.router.navigate(['']);
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
        this.properties = properties.total;
        let myProperties: any[] = properties.records.filter(
          (property: PropertyModel) => property.adviserId == this.adviserId
        );
        this.propertiesMine = myProperties.length;
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
          (requests: any) =>
            requests.requestStatusId == 1 &&
            requests.adviserId == this.adviserId
        );
        let requestsStudy: any[] = data.records.filter(
          (requests: any) =>
            requests.requestStatusId == 2 &&
            requests.adviserId == this.adviserId
        );
        let requestsAccepted: any[] = data.records.filter(
          (requests: any) =>
            requests.requestStatusId == 3 &&
            requests.adviserId == this.adviserId
        );
        let requestsRejected: any[] = data.records.filter(
          (requests: any) =>
            requests.requestStatusId == 4 &&
            requests.adviserId == this.adviserId
        );
        let requestsGuarantor: any[] = data.records.filter(
          (requests: any) =>
            requests.requestStatusId == 1 &&
            requests.adviserId == this.adviserId
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

  goToProperties() {
    this.router.navigate(['/parameters/list-property']);
  }

  goToRequests() {
    this.router.navigate(['/parameters/list-request']);
  }
}
