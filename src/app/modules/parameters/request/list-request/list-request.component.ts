import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { ChangeStatusModel } from 'src/app/models/ChangeStatus.model';
import { RequestModel } from 'src/app/models/Request.model';
import { RequestStatusModel } from 'src/app/models/RequestStatus.model';
import { UserModel } from 'src/app/models/User.model';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css'],
})
export class ListRequestComponent {
  requests: RequestModel[] = [];
  requestStatus: RequestStatusModel[] = [];
  fgroup: FormGroup = new FormGroup({});
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;
  user: UserModel = {};
  adminId = RolesConfig.administratorId;
  adviserId = RolesConfig.adviserId;
  clientId = RolesConfig.clientId;

  constructor(
    private fb: FormBuilder,
    private service: RequestService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      this.user = data.user!;
      this.buildSelectors();
      this.buildDataFG();
      this.getRequestStatus();
      this.get();
    } else {
      this.router.navigate(['']);
    }
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  buildDataFG() {
    this.fgroup = this.fb.group({
      status: [-1],
    });
  }

  get getDataFG() {
    return this.fgroup.controls;
  }

  get() {
    let status = parseInt(this.getDataFG['status'].value);
    console.log(status);
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter;
    if (this.user.roleId == this.clientId) {
      if (status == -1) {
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
      } else {
        filter = {
          where: {
            clientId: this.user.accountId,
            requestStatusId: status,
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
      }
    } else if (this.user.roleId == this.adviserId) {
      if (status == -1) {
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
          where: {
            adviserId: this.user.accountId,
            requestStatusId: status,
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
      }
    } else {
      if (status == -1) {
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

  getRequestStatus() {
    let filter = {};
    this.service.getRequestStatus(filter).subscribe({
      next: (data: any) => {
        this.requestStatus = data;
        this.refresh();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  inStudy(id: number) {
    let change: ChangeStatusModel = {
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

  refresh() {
    let filter = {};
    this.service.getRequestStatus(filter).subscribe({
      next: () => {
        console.log('Creating elements...');
        this.buildSelectors();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
