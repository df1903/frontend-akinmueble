import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { RequestModel } from 'src/app/models/Request.model';
import { UserModel } from 'src/app/models/User.model';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css'],
})
export class ListRequestComponent {
  requests: RequestModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;
  user: UserModel = {};
  adminId = RolesConfig.administratorId;
  adviserId = RolesConfig.adviserId;
  clientId = RolesConfig.clientId;

  constructor(
    private service: RequestService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      this.user = data.user!;
      this.get();
    } else {
      this.router.navigate(['']);
    }
  }

  get() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter;
    if (this.user.roleId == this.clientId) {
      filter = {
        where: {
          clientId: this.user.accountId,
        },
        include: [
          { relation: 'adviser' },
          { relation: 'client' },
          { relation: 'property' },
          { relation: 'requestType' },
          { relation: 'requestStatus' },
        ],
        limit: limit,
        skip: skip,
      };
    } else if (this.user.roleId == this.adviserId) {
      filter = {
        where: {
          adviserId: this.user.accountId,
        },
        include: [
          { relation: 'adviser' },
          { relation: 'client' },
          { relation: 'property' },
          { relation: 'requestType' },
          { relation: 'requestStatus' },
        ],
        limit: limit,
        skip: skip,
      };
    } else {
      filter = {
        include: [
          { relation: 'adviser' },
          { relation: 'client' },
          { relation: 'property' },
          { relation: 'requestType' },
          { relation: 'requestStatus' },
        ],
        limit: limit,
        skip: skip,
      };
    }
    this.service.getRequests(filter).subscribe({
      next: (data: any) => {
        this.requests = data.records;
        this.total = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  inStudy(id: number) {
    let change = {
      requestId: id,
      status: 2,
    };
    this.service.changeStatus(change).subscribe({
      next: (data: any) => {
        this.get();
        alert('The Request has been marked for Study');
      },
      error: (err: any) => {
        alert('Error changing the status');
      },
    });
  }
}
