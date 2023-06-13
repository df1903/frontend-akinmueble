import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ActiveSessionGuard } from 'src/app/guardians/active-session.guard';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { DeleteDepartmentComponent } from './department/delete-department/delete-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { CreateCityComponent } from './city/create-city/create-city.component';
import { DeleteCityComponent } from './city/delete-city/delete-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { DeleteAdviserComponent } from './adviser/delete-adviser/delete-adviser.component';
import { EditAdviserComponent } from './adviser/edit-adviser/edit-adviser.component';
import { ListAdviserComponent } from './adviser/list-adviser/list-adviser.component';
import { CreatePropertyTypeComponent } from './property-type/create-property-type/create-property-type.component';
import { DeletePropertyTypeComponent } from './property-type/delete-property-type/delete-property-type.component';
import { EditPropertyTypeComponent } from './property-type/edit-property-type/edit-property-type.component';
import { ListPropertyTypeComponent } from './property-type/list-property-type/list-property-type.component';
import { DeleteRequestComponent } from './request/delete-request/delete-request.component';
import { EditRequestComponent } from './request/edit-request/edit-request.component';
import { ListRequestComponent } from './request/list-request/list-request.component';

const routes: Routes = [
  /** Property CRUD */
  {
    path: 'create-property', // Create Property path
    component: CreatePropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-property/:id', // Delete Property path
    component: DeletePropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-property/:id', // Edit Property path
    component: EditPropertyComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-property', // List Property path
    component: ListPropertyComponent,
    canActivate: [ActiveSessionGuard],
  },

  /** Department CRUD */
  {
    path: 'create-department', // Create Property path
    component: CreateDepartmentComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-department/:id', // Delete Property path
    component: DeleteDepartmentComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-department/:id', // Edit Property path
    component: EditDepartmentComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-department', // List Property path
    component: ListDepartmentComponent,
    canActivate: [ActiveSessionGuard],
  },

  /** City CRUD */
  {
    path: 'create-city', // Create City path
    component: CreateCityComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-city/:id', // Delete City path
    component: DeleteCityComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-city/:id', // Edit City path
    component: EditCityComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-city', // List City path
    component: ListCityComponent,
    canActivate: [ActiveSessionGuard],
  },

  /** Adviser CRUD */
  {
    path: 'delete-adviser/:id', // Delete Adviser path
    component: DeleteAdviserComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-adviser/:id', // Edit Adviser path
    component: EditAdviserComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-adviser', // List Adviser path
    component: ListAdviserComponent,
    canActivate: [ActiveSessionGuard],
  },

  /** Property Type CRUD */
  {
    path: 'create-property-type', // Create Property Type path
    component: CreatePropertyTypeComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-property-type/:id', // Delete Property Type path
    component: DeletePropertyTypeComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-property-type/:id', // Edit Property Type path
    component: EditPropertyTypeComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-property-type', // List Property Type path
    component: ListPropertyTypeComponent,
    canActivate: [ActiveSessionGuard],
  },

  /** Request CRUD */
  {
    path: 'delete-request/:id', // Delete Request path
    component: DeleteRequestComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-request/:id', // Edit Request path
    component: EditRequestComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-request', // List Request path
    component: ListRequestComponent,
    canActivate: [ActiveSessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
