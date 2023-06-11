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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
