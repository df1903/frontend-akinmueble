import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ActiveSessionGuard } from 'src/app/guardians/active-session.guard';
import { CreateRequestClientComponent } from './requestClient/create-request-client/create-request-client.component';
import { ListRequestClientComponent } from './requestClient/list-request-client/list-request-client.component';
import { DeleteRequestClientComponent } from './requestClient/delete-request-client/delete-request-client.component';
import { EditRequestClientComponent } from './requestClient/edit-request-client/edit-request-client.component';
import { CreateContractsComponent } from './contracts/create-contracts/create-contracts.component';
import { ListContractsComponent } from './contracts/list-contracts/list-contracts.component';
import { DeleteContractsComponent } from './contracts/delete-contracts/delete-contracts.component';
import { EditContractsComponent } from './contracts/edit-contracts/edit-contracts.component';
import { EditGuarantorComponent } from './guarantor/edit-guarantor/edit-guarantor.component';
import { DeleteGuarantorComponent } from './guarantor/delete-guarantor/delete-guarantor.component';
import { ListGuarantorComponent } from './guarantor/list-guarantor/list-guarantor.component';
import { CreateGuarantorComponent } from './guarantor/create-guarantor/create-guarantor.component';
import { ViewCommenRequestsComponent } from './viewRequest/view-commen-requests/view-commen-requests.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';


const routes: Routes = [
  /** Property CRUD */
  {
    path: 'create-property', // Create Property path
    component: CreatePropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-property', // Delete Property path
    component: DeletePropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-property', // Edit Property path
    component: EditPropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-property', // List Property path
    component: ListPropertyComponent,
  },

  /*CRUD Request*/
  {
    path: 'create-requestClient', // create Request path
    component: CreateRequestClientComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-requestClient', // List Request path
    component: ListRequestClientComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'delete-requestClient', // Delete Request path
    component: DeleteRequestClientComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'edit-requestClient', // Edit Request path
    component: EditRequestClientComponent,
    canActivate: [ActiveSessionGuard],
  },

  /*CRUD Contracts*/
  {
    path: 'create-contracts', // create contracts path
    component: CreateContractsComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-contracts', // List contracts path
    component: ListContractsComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'delete-contracts', // Delete contracts path
    component: DeleteContractsComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'edit-contracts', // Edit contracts path
    component: EditContractsComponent,
    canActivate: [ActiveSessionGuard],
  },
  /*CRUD Guarantor*/
  {
    path: 'create-guarantor', // create contracts path
    component: CreateGuarantorComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-guarantor', // List contracts path
    component: ListGuarantorComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'delete-guarantor', // Delete contracts path
    component: DeleteGuarantorComponent,
    canActivate: [ActiveSessionGuard],
  }
  ,
  {
    path: 'edit-guarantor', // Edit contracts path
    component: EditGuarantorComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'view-requestClient', // view request Client
    component: ViewCommenRequestsComponent,
    canActivate: [ActiveSessionGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
