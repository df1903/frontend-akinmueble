import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PropertyTypeModel } from 'src/app/models/propertyType.model';
import { PropertyTypeService } from 'src/app/services/parameters/property-type.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-delete-property-type',
  templateUrl: './delete-property-type.component.html',
  styleUrls: ['./delete-property-type.component.css'],
})
export class DeletePropertyTypeComponent {
  propertyTypeId = 0;
  propertyType: PropertyTypeModel = {};
  logicUrl = RoutesBackendConfig.urlBusinessLogic;

  constructor(
    private security: SecurityService,
    private service: PropertyTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.propertyTypeId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getPropertyType();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  deletePropertyType() {
    this.service.deletePropertyTypes(this.propertyTypeId).subscribe({
      next: (data) => {
        alert('Property Type Deleted Successfully');
        this.router.navigate(['parameters/list-property-type']);
      },
      error: (err: any) => {
        alert("ERROR: The file can't be accessed or can't be deleted");
      },
    });
  }

  getPropertyType() {
    let filter = {
      where: {
        id: this.propertyTypeId,
      },
    };
    this.service.getPropertyTypes(filter).subscribe({
      next: (data) => {
        this.propertyType = data.records[0];
        console.log(this.propertyType);
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }
}
