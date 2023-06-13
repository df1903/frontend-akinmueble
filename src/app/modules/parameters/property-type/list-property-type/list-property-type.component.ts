import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { PropertyTypeModel } from 'src/app/models/Property-type.model';
import { PropertyTypeService } from 'src/app/services/parameters/property-type.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-list-property-type',
  templateUrl: './list-property-type.component.html',
  styleUrls: ['./list-property-type.component.css'],
})
export class ListPropertyTypeComponent {
  propertyTypes: PropertyTypeModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;

  constructor(
    private service: PropertyTypeService,
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

    this.service.getPropertyTypes(filter).subscribe({
      next: (data: any) => {
        this.propertyTypes = data.records;
        this.total = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
