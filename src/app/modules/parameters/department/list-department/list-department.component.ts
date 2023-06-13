import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { DepartmentModel } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent {
  departments: DepartmentModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;

  constructor(
    private service: DepartmentService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.get();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  get() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter = {
      limit: limit,
      skip: skip,
    };

    this.service.getDepartments(filter).subscribe({
      next: (data: any) => {
        this.departments = data.records;
        this.total = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
