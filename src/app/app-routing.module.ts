import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PathNotFoundComponent } from './public/errors/path-not-found/path-not-found.component';
import { ContactComponent } from './public/contact/contact.component';
import { RegisterSwitchComponent } from './public/register-switch/register-switch.component';
import { MissionAndVisionComponent } from './public/mission-and-vision/mission-and-vision.component';
import { PublicRegistryRequestingAdviceComponent } from './public/public-registry-requesting-advice/public-registry-requesting-advice.component';
import { InactiveSessionGuard } from './guardians/inactive-session.guard';
import { PropertiesComponent } from './public/properties/properties.component';
import { AdminPageComponent } from './public/admin-page/admin-page.component';
import { AdviserPageComponent } from './public/adviser-page/adviser-page.component';
import { ClientPageComponent } from './public/client-page/client-page.component';
import { ActiveSessionGuard } from './guardians/active-session.guard';

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
    path: 'mission-vision', // Page mission and vision
    component: MissionAndVisionComponent,
  },
  {
    path: 'properties', // View of the public properties
    component: PropertiesComponent,
  },
  {
    path: 'admin-page', // Managment admin
    component: AdminPageComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'adviser-page', // Managment adviser
    component: AdviserPageComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'client-page', // Managment adviser
    component: ClientPageComponent,
    canActivate: [ActiveSessionGuard],
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
