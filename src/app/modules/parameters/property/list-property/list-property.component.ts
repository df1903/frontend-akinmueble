import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { PropertyModel } from 'src/app/models/Property.model';
import { UserModel } from 'src/app/models/User.model';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
})
export class ListPropertyComponent {
  properties: PropertyModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;
  user: UserModel = {};
  adminId = RolesConfig.administratorId;

  constructor(
    private service: PropertyService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      this.user = data.user!;
      if (
        this.user.roleId == RolesConfig.administratorId ||
        this.user.roleId == RolesConfig.adviserId
      ) {
        this.getProperties();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  getProperties() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter = {
      include: [
        { relation: 'city' },
        { relation: 'propertyType' },
        { relation: 'adviser' },
      ],
      limit: limit,
      skip: skip,
    };

    this.service.getProperties(filter).subscribe({
      next: (properties: any) => {
        this.properties = properties.records;
        this.total = properties.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
