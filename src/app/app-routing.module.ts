import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PathNotFoundComponent } from './public/errors/path-not-found/path-not-found.component';
import { RegisterSwitchComponent } from './public/register-switch/register-switch.component';

const routes: Routes = [
  {
    path: 'home', // Home path
    component: HomeComponent,
  },
  {
    path: '', // Empty path
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path:'register-switch',
    component: RegisterSwitchComponent
  },
  {
    path: 'security', // Security module path
    loadChildren: () =>
      import('src/app/modules/security/security.module').then(
        (m) => m.SecurityModule
      ),
  },
  {
    path: '**', // Path not found
    component: PathNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
