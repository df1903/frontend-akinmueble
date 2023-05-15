import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PathNotFoundComponent } from './public/errors/path-not-found/path-not-found.component';
import { ContactComponent } from './public/contact/contact.component';
import { RegisterSwitchComponent } from './public/register-switch/register-switch.component';
import { PublicRegistryRequestingAdviceComponent } from './public/public-registry-requesting-advice/public-registry-requesting-advice.component';
import { LoaderComponent } from './public/loader/loader.component';
import { InactiveSessionGuard } from './guardians/inactive-session.guard';

const routes: Routes = [
  {
    path: '', // Empty path
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home', // Home path
    component: HomeComponent,
  },
  {
    path: 'contact', // Contact path
    component: ContactComponent,
  },
  {
    path: 'register-switch', // Register Switch path
    component: RegisterSwitchComponent,
    canActivate: [InactiveSessionGuard],
  },
  {
    path: 'register-adviser-requesting', // Register Adviser path
    component: PublicRegistryRequestingAdviceComponent,
    canActivate: [InactiveSessionGuard],
  },
  {
    path: 'security', // Security module path
    loadChildren: () =>
      import('src/app/modules/security/security.module').then(
        (m) => m.SecurityModule
      ),
  },
  {
    path: 'parameters', // Parameters module path
    loadChildren: () =>
      import('src/app/modules/parameters/parameters.module').then(
        (m) => m.ParametersModule
      ),
  },
  {
    path: 'reports', // Reports module path
    loadChildren: () =>
      import('src/app/modules/reports/reports.module').then(
        (m) => m.ReportsModule
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
