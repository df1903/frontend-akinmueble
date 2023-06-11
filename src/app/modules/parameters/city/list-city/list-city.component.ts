import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/pager.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/parameters/city.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent {
  cities: CityModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;

  constructor(
    private service: CityService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.administratorId
      ) {
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
      include: [
        {relation: 'department'}
      ],
      limit: limit,
      skip: skip,
    };

    this.service.getCities(filter).subscribe({
      next: (data: any) => {
        let array: CityModel[] = data.records;
        array.sort((a, b) => {
          const nameA = a.departmentId!;
          const nameB = b.departmentId!;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.cities = array;
        this.total = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
