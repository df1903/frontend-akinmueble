import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
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
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    });
  }

  changePassword() {
    if (this.fGroup.invalid) {
      alert('Incomplete Data');
    } else {
      let oldPassword = this.getFormGroup['oldPassword'].value;
      let newPassword = this.getFormGroup['newPassword'].value;
      let confirmNewPassword = this.getFormGroup['confirmNewPassword'].value;
      if (newPassword == confirmNewPassword) {
        let encryptedoldPassword = MD5(oldPassword).toString();
        let encryptednewPassword = MD5(newPassword).toString();
        this.securityService
          .userChangePassword(encryptedoldPassword, encryptednewPassword)
          .subscribe({
            next: (data) => {
              console.log(data);
              if (!data) {
                alert('Incorrect Credentials');
              } else {
                alert(`Your password has been changed.`);
                this.router.navigate(['']);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        alert("Passwords don't match");
      }
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
