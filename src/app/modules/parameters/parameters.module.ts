import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { EditContractsComponent } from './contracts/edit-contracts/edit-contracts.component';
import { ListContractsComponent } from './contracts/list-contracts/list-contracts.component';
import { DeleteContractsComponent } from './contracts/delete-contracts/delete-contracts.component';
import { CreateContractsComponent } from './contracts/create-contracts/create-contracts.component';
import { CreateGuarantorComponent } from './guarantor/create-guarantor/create-guarantor.component';
import { DeleteGuarantorComponent } from './guarantor/delete-guarantor/delete-guarantor.component';
import { EditGuarantorComponent } from './guarantor/edit-guarantor/edit-guarantor.component';
import { ListGuarantorComponent } from './guarantor/list-guarantor/list-guarantor.component';


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
    EditContractsComponent,
    ListContractsComponent,
    DeleteContractsComponent,
    CreateContractsComponent,
    CreateGuarantorComponent,
    DeleteGuarantorComponent,
    EditGuarantorComponent,
    ListGuarantorComponent
   ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
