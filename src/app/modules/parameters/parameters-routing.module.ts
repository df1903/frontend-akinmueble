import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { ActiveSessionGuard } from 'src/app/guardians/active-session.guard';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
