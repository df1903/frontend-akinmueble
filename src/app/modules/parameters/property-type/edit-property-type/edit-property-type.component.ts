import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PropertyTypeModel } from 'src/app/models/propertyType.model';
import { PropertyTypeService } from 'src/app/services/parameters/property-type.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-edit-property-type',
  templateUrl: './edit-property-type.component.html',
  styleUrls: ['./edit-property-type.component.css'],
})
export class EditPropertyTypeComponent {
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
  ) {
    this.propertyTypeId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getPropertyType();
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

  replaceDataFG() {
    this.dataFG.get('name')?.patchValue(this.propertyType.name);
    this.dataFG
      .get('rentParticipationPercentage')
      ?.patchValue(this.propertyType.rentParticipationPercentage);
    this.dataFG
      .get('sellParticipationPercentage')
      ?.patchValue(this.propertyType.sellParticipationPercentage);
    this.dataFG.get('description')?.patchValue(this.propertyType.description);
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
        this.replaceDataFG();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  editPropertyType() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.editPropertyTypes(model).subscribe({
        next: (data: PropertyTypeModel) => {
          alert('Property Type Edited Successfully');
          this.router.navigate(['/parameters/list-property-type']);
        },
        error: (err: any) => {
          alert('An Error has happened editing the property type');
        },
      });
    }
  }

  get(): PropertyTypeModel {
    let model = new PropertyTypeModel();
    model.id = this.propertyType.id;
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
