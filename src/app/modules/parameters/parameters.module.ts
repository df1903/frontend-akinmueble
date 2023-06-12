import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { EditRequestClientComponent } from './requestClient/edit-request-client/edit-request-client.component';
import { ListRequestClientComponent } from './requestClient/list-request-client/list-request-client.component';
import { CreateRequestClientComponent } from './requestClient/create-request-client/create-request-client.component';
import { DeleteRequestClientComponent } from './requestClient/delete-request-client/delete-request-client.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CreatePropertyComponent,
    DeletePropertyComponent,
    EditPropertyComponent,
    ListPropertyComponent,
    EditRequestClientComponent,
    ListRequestClientComponent,
    CreateRequestClientComponent,
    DeleteRequestClientComponent,
   ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    NgxPaginationModule
  ]
})
export class ParametersModule { }
