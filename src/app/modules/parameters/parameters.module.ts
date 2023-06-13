import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { DeleteRequestComponent } from './request/delete-request/delete-request.component';

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
    DeleteRequestComponent,
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ParametersModule {}
