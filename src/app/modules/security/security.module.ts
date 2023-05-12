import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PublicUserRegistryComponent } from './public-user-registry/public-user-registry.component';


@NgModule({
  declarations: [
    LoginComponent,
    CodeVerificationComponent,
    RecoveryPasswordComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    DeleteUserComponent,
    EditUserComponent,
    ListUserComponent,
    LogOutComponent,
    PublicUserRegistryComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecurityModule { }
