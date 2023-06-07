import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

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
import { PublicUserRegistryComponent } from './public-user-registry/public-user-registry.component';
import { GeneralConfig } from 'src/app/config/general.config';
import { HashVerificationComponent } from './hash-verification/hash-verification.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

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
    PublicUserRegistryComponent,
    HashVerificationComponent,
    ProfileUserComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: GeneralConfig.recaptchaSiteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class SecurityModule {}
