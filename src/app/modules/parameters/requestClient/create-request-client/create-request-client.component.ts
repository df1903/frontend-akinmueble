import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/Adviser.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { CityModel } from 'src/app/models/City.model';
import { ContractsModel } from 'src/app/models/Contract.model';
import { GuarantorModel } from 'src/app/models/Guarantor.model';
import { PropertyTypeModel } from 'src/app/models/PropertyType.model';
import { RequestStatusModel } from 'src/app/models/RequestStatus.model';
import { RequestTypeModel } from 'src/app/models/requestType.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { SecurityService } from 'src/app/services/security.service';
declare var M: any;
@Component({
  selector: 'app-create-request-client',
  templateUrl: './create-request-client.component.html',
  styleUrls: ['./create-request-client.component.css'],
})
export class CreateRequestClientComponent {
  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  fileFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  propertyTypes: PropertyTypeModel[] = [];
  cities: CityModel[] = [];
  advisers: AdviserModel[] = [];
  guarantor: GuarantorModel[] = [];
  contract: ContractsModel[] = [];
  property: PropertyModel[] = [];
  requestStatus: RequestStatusModel[] = [];
  requestType: RequestTypeModel[] = [];

  constructor(
    private fb: FormBuilder,
    private propertySvc: PropertyService,
    private citySvc: CityService,
    private adviserSvc: AdviserService,
    private router: Router,
    private security: SecurityService
  ) {}
}
