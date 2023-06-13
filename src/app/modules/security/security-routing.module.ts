import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogOutComponent } from './log-out/log-out.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { PublicUserRegistryComponent } from './public-user-registry/public-user-registry.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { HashVerificationComponent } from './hash-verification/hash-verification.component';
import { InactiveSessionGuard } from 'src/app/guardians/inactive-session.guard';
import { ActiveSessionGuard } from 'src/app/guardians/active-session.guard';
import { ChangeContactInfoComponent } from './change-contact-info/change-contact-info.component';

const routes: Routes = [
  {
    path: 'login', // Login path
    component: LoginComponent,
    canActivate: [InactiveSessionGuard],
  },
  {
    path: 'recovery-password', // Recovery password path
    component: RecoveryPasswordComponent,
    canActivate: [InactiveSessionGuard],
  },
  {
    path: 'change-password', // Change password path
    component: ChangePasswordComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'code-verification', // Code verification path
    component: CodeVerificationComponent,
    canActivate: [InactiveSessionGuard],
  },
  {
    path: 'log-out', // Log out path
    component: LogOutComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'hash-verification/:hash', // Has Verification path
    component: HashVerificationComponent,
  },
  {
    path: 'user-registration', // User registration
    component: PublicUserRegistryComponent,
    canActivate: [InactiveSessionGuard],
  },

  // User crud
  {
    path: 'create-user', // Create user path
    component: CreateUserComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'edit-user', // Edit user path
    component: EditUserComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'list-user', // List user path
    component: ListUserComponent,
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'delete-user', // Delete user path
    component: DeleteUserComponent,
    canActivate: [ActiveSessionGuard],
  },
  // Edit System Variables
  {
    path: 'change-contact-info', // Managment Contact Info
    component: ChangeContactInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
