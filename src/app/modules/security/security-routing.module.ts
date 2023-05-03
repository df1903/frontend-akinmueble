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

const routes: Routes = [
  {
    path:"login", // Login path
    component: LoginComponent
  },
  {
    path:"recovery-password", // Recovery password path
    component: RecoveryPasswordComponent
  },
  {
    path:"change-password", // Change password path
    component: ChangePasswordComponent
  },
  {
    path:"code-verification", // Code verification path
    component: ChangePasswordComponent
  },
  {
    path:"log-out", // Log out path
    component: LogOutComponent
  },
  // User crud
  {
    path:"create-user", // Create user path
    component: CreateUserComponent
  },
  {
    path:"edit-user", // Edit user path
    component: EditUserComponent
  },
  {
    path:"list-user", // List user path
    component: ListUserComponent
  },
  {
    path:"delete-user", // Delete user path
    component: DeleteUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
