import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PropertyTypeModel } from 'src/app/models/propertyType.model';
import { PropertyTypeService } from 'src/app/services/parameters/property-type.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-property-type',
  templateUrl: './create-property-type.component.html',
  styleUrls: ['./create-property-type.component.css'],
})
export class CreatePropertyTypeComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  propertyType: PropertyTypeModel = {};
  propertyTypeId = 0;

  constructor(
    private fb: FormBuilder,
    private service: PropertyTypeService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
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
      rentParticipationPercentage: ['', [Validators.required]],
      sellParticipationPercentage: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  createPropertyType() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.createPropertyTypes(model).subscribe({
        next: (data: PropertyTypeModel) => {
          alert('Property Type Created Successfully');
          this.router.navigate(['/parameters/list-property-type']);
        },
        error: (err: any) => {
          alert('An Error has happened creating the property type');
        },
      });
    }
  }

  get(): PropertyTypeModel {
    let model = new PropertyTypeModel();
    model.name = this.getDataFG['name'].value;
    model.rentParticipationPercentage =
      this.getDataFG['rentParticipationPercentage'].value;
    model.sellParticipationPercentage =
      this.getDataFG['sellParticipationPercentage'].value;
    model.description = this.getDataFG['description'].value;
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
