import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { DepartmentModel } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent {
  departmentId = 0;
  department: DepartmentModel = {};
  logicUrl = RoutesBackendConfig.urlBusinessLogic;

  constructor(
    private security: SecurityService,
    private service: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.departmentId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.administratorId
      ) {
        this.getDepartment();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  deleteDepartment() {
    this.service.deleteDepartment(this.departmentId).subscribe({
      next: (data) => {
        alert('Propertie Deleted Successfully');
        this.router.navigate(['parameters/list-department']);
      },
      error: (err: any) => {
        alert("ERROR: The file can't be accessed or can't be deleted")
      },
    });
  }

  getDepartment() {
    let filter = {
      where: {
        id: this.departmentId,
      },
    };
    this.service.getDepartments(filter).subscribe({
      next: (data) => {
        this.department = data.records[0];
        console.log(this.department);
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }
}
