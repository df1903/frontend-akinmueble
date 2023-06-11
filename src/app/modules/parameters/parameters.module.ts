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

  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ParametersModule { }
