import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { AdviserModel } from 'src/app/models/Adviser.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-list-adviser',
  templateUrl: './list-adviser.component.html',
  styleUrls: ['./list-adviser.component.css'],
})
export class ListAdviserComponent {
  advisers: AdviserModel[] = [];
  fgroup: FormGroup = new FormGroup({});
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;
  status = [
    { id: 2, name: 'All' },
    { id: null, name: 'Pending' },
    { id: false, name: 'Rejected' },
    { id: true, name: 'Accepted' },
  ];

  constructor(
    private fb: FormBuilder,
    private service: AdviserService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.buildSelectors();
        this.buildDataFG();
        this.getAdvisers();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildDataFG() {
    this.fgroup = this.fb.group({
      status: [2],
    });
  }

  get getDataFG() {
    return this.fgroup.controls;
  }

  getAdvisers() {
    let status = this.getDataFG['status'].value;
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter;
    console.log(status);
    if (status == 'null') {
      filter = {
        where: {
          accepted: null,
        },
        limit: limit,
        skip: skip,
      };
    } else if (status != 2) {
      filter = {
        where: {
          accepted: status,
        },
        limit: limit,
        skip: skip,
      };
    } else {
      filter = {
        limit: limit,
        skip: skip,
      };
    }

    this.service.getAdvisers(filter).subscribe({
      next: (data: any) => {
        this.advisers = data.records;
        this.total = data.total;
        this.buildSelectors();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  acceptAdviser(id: number) {
    this.service.responseAdviser(id, true).subscribe({
      next: (data: any) => {
        this.getAdvisers();
        alert('Adviser Accepted Successfully');
      },
      error: (err: any) => {
        alert('Error Accepting Adviser');
      },
    });
  }

  rejectAdviser(id: number) {
    this.service.responseAdviser(id, false).subscribe({
      next: (data: any) => {
        this.getAdvisers();
        alert('Adviser Rejected Successfully');
      },
      error: (err: any) => {
        alert('Error Rejecting Adviser');
      },
    });
  }
}
