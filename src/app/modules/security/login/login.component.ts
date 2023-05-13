import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralConfig } from 'src/app/config/general.config';
import { UserModel } from 'src/app/models/User.model';
import { SecurityService } from 'src/app/services/security.service';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  siteKey: string = GeneralConfig.recaptchaSiteKey;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.fGroup = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: [null, [Validators.required]],
    });
  }

  userLogin() {
    if (this.fGroup.invalid) {
      alert('Incomplete Data');
    } else {
      let user = this.getFormGroup['user'].value;
      let password = this.getFormGroup['password'].value;
      let encryptedPassword = MD5(password).toString();
      console.log(user, password);
      this.securityService.userLogin(user, encryptedPassword).subscribe({
        next: (data: UserModel) => {
          if (data._id == undefined || data._id == null) {
            alert('Incorrect Credentials');
          } else {
            if (this.securityService.storeUserData(data)) {
              this.router.navigate(['/security/code-verification']);
            }
          }
        },
        error: (err) => {
          console.log('error ' + err);
        },
      });
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
