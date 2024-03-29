import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { CityModel } from 'src/app/models/City.model';
import { DepartmentModel } from 'src/app/models/Department.model';
import { CityService } from 'src/app/services/parameters/city.service';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css'],
})
export class CreateCityComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  city: CityModel = {};
  cityId = 0;
  departments: DepartmentModel[] = [];

  constructor(
    private fb: FormBuilder,
    private service: CityService,
    private departmentSvc: DepartmentService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getCity();
        this.buildDataFG();
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

  buildDataFG() {
    this.dataFG = this.fb.group({
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }
  getCity() {
    let filter = {
      where: {
        id: this.cityId,
      },
    };
    this.service.getCities(filter).subscribe({
      next: (data) => {
        this.city = data.records[0];
        console.log(this.city);
        this.getDepartments();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  getDepartments() {
    let filter = {};
    this.departmentSvc.getDepartments(filter).subscribe({
      next: (data) => {
        let array: CityModel[] = data.records;
        array.sort((a, b) => {
          const nameA = a.name!.toLowerCase();
          const nameB = b.name!.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.departments = array;
        console.log(this.departments);
        this.refresh();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createCity() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.createCity(model).subscribe({
        next: (data: CityModel) => {
          alert('City Created Successfully');
          this.router.navigate(['/parameters/list-city']);
        },
        error: (err: any) => {
          alert('An Error has happened creating the city');
        },
      });
    }
  }

  get(): CityModel {
    let model = new CityModel();
    model.name = this.getDataFG['name'].value;
    model.departmentId = parseInt(this.getDataFG['department'].value);
    console.log(model);
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    }
    return model;
  }

  get getDataFG() {
    return this.dataFG.controls;
  }

  refresh() {
    let filter = {};
    this.departmentSvc.getDepartments(filter).subscribe({
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
