import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { DepartmentModel } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  department: DepartmentModel = {};
  departmentId = 0;

  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (
        data.user?.roleId == RolesConfig.administratorId
      ) {
        this.buildDataFG();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  createDepartment() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.createDepartment(model).subscribe({
        next: (data: DepartmentModel) => {
          alert('department Edited Successfully');
          this.router.navigate(['/parameters/list-department']);
        },
        error: (err: any) => {
          alert('An Error has happened creating the department');
        },
      });
    }
  }

  get(): DepartmentModel {
    let model = new DepartmentModel();
    model.name = this.getDataFG['name'].value;
    console.log(model);
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    }
    return model;
  }

  get getDataFG() {
    return this.dataFG.controls;
  }
}
