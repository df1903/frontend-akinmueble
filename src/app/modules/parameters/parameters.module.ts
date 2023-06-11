import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreatePropertyComponent,
    DeletePropertyComponent,
    EditPropertyComponent,
    ListPropertyComponent,

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
