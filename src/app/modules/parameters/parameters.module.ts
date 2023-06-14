import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { DeleteDepartmentComponent } from './department/delete-department/delete-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { CreateCityComponent } from './city/create-city/create-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { DeleteCityComponent } from './city/delete-city/delete-city.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { ListAdviserComponent } from './adviser/list-adviser/list-adviser.component';
import { EditAdviserComponent } from './adviser/edit-adviser/edit-adviser.component';
import { DeleteAdviserComponent } from './adviser/delete-adviser/delete-adviser.component';
import { ListPropertyTypeComponent } from './property-type/list-property-type/list-property-type.component';
import { CreatePropertyTypeComponent } from './property-type/create-property-type/create-property-type.component';
import { DeletePropertyTypeComponent } from './property-type/delete-property-type/delete-property-type.component';
import { EditPropertyTypeComponent } from './property-type/edit-property-type/edit-property-type.component';
import { ListRequestComponent } from './request/list-request/list-request.component';
import { EditRequestComponent } from './request/edit-request/edit-request.component';
import { CancelRequestComponent } from './request/cancel-request/cancel-request.component';
import { ReviewRequestComponent } from './request/review-request/review-request.component';
import { EditContractsComponent } from './contracts/edit-contracts/edit-contracts.component';
import { ListContractsComponent } from './contracts/list-contracts/list-contracts.component';
import { DeleteContractsComponent } from './contracts/delete-contracts/delete-contracts.component';
import { CreateContractsComponent } from './contracts/create-contracts/create-contracts.component';
import { CreateGuarantorComponent } from './guarantor/create-guarantor/create-guarantor.component';
import { DeleteGuarantorComponent } from './guarantor/delete-guarantor/delete-guarantor.component';
import { EditGuarantorComponent } from './guarantor/edit-guarantor/edit-guarantor.component';
import { ListGuarantorComponent } from './guarantor/list-guarantor/list-guarantor.component';
import { CreateRequestComponent } from './request/create-request/create-request.component';

@NgModule({
  declarations: [
    CreatePropertyComponent,
    DeletePropertyComponent,
    EditPropertyComponent,
    ListPropertyComponent,
    CreateDepartmentComponent,
    ListDepartmentComponent,
    DeleteDepartmentComponent,
    EditDepartmentComponent,
    CreateCityComponent,
    EditCityComponent,
    DeleteCityComponent,
    ListCityComponent,
    ListAdviserComponent,
    EditAdviserComponent,
    DeleteAdviserComponent,
    ListPropertyTypeComponent,
    CreatePropertyTypeComponent,
    DeletePropertyTypeComponent,
    EditPropertyTypeComponent,
    ListRequestComponent,
    EditRequestComponent,
    CancelRequestComponent,
    ReviewRequestComponent,
    EditContractsComponent,
    ListContractsComponent,
    DeleteContractsComponent,
    CreateContractsComponent,
    CreateGuarantorComponent,
    DeleteGuarantorComponent,
    EditGuarantorComponent,
    ListGuarantorComponent,
    CreateRequestComponent,
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ParametersModule {}
