import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/parameters/city.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css'],
})
export class DeleteCityComponent {
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  city: CityModel = {};
  cityId = 0;

  constructor(
    private service: CityService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.cityId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getCity();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildSelectors() {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }

  getCity() {
    let filter = {
      include: [{ relation: 'department' }],
      where: {
        id: this.cityId,
      },
    };
    this.service.getCities(filter).subscribe({
      next: (data) => {
        this.city = data.records[0];
        console.log(this.city);
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  deleteCity() {
    this.service.deleteCity(this.cityId).subscribe({
      next: (data: CityModel) => {
        alert('City Edited Successfully');
        this.router.navigate(['/parameters/list-city']);
      },
      error: (err: any) => {
        alert('An Error has happened creating the department');
      },
    });
  }
}
