import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
})
export class ClientPageComponent {
  user: UserModel = new UserModel();
  clientId: number = 0;

  requests: number = 0;
  requestsAccepted: number = 0;
  requestsRejected: number = 0;
  requestsGuarantor: number = 0;
  requestsPending: number = 0;
  requestsStudy: number = 0;

  constructor(
    private securityService: SecurityService,
    private requestSvc: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionValidation();
    this.getRequests();
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.user = data.user!;
          this.clientId = this.user.accountId!;
          if (this.user.roleId != RolesConfig.clientId) {
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

  getRequests() {
    let filter = {
      where: {
        clientId: this.clientId,
      },
    };
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
          (requests: any) => requests.requestStatusId == 5
        );
        this.requests = data.records.length;
        this.requestsPending = requestsPending.length;
        this.requestsStudy = requestsStudy.length;
        this.requestsAccepted = requestsAccepted.length;
        this.requestsRejected = requestsRejected.length;
        this.requestsGuarantor = requestsGuarantor.length;
        console.log(this.requests);
        console.log(this.requestsPending);
        console.log(this.requestsStudy);
        console.log(this.requestsAccepted);
        console.log(this.requestsRejected);
        console.log(this.requestsGuarantor);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
