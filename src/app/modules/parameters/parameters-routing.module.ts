import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';

const routes: Routes = [
  /** Property CRUD */
  {
    path: 'create-property', // Create Property path
    component: CreatePropertyComponent,
  },
  {
    path: 'delete-property', // Delete Property path
    component: ListPropertyComponent,
  },
  {
    path: 'edit-property', // Edit Property path
    component: EditPropertyComponent,
  },
  {
    path: 'list-property', // List Property path
    component: ListPropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
