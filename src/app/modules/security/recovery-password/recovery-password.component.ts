import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
})
export class RecoveryPasswordComponent implements OnInit {
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
    });
  }

  recoveryPassword() {
    if (this.fGroup.invalid) {
      alert('Incomplete Data');
    } else {
      let user = this.getFormGroup['user'].value;
      this.securityService.userRecoveryPassword(user).subscribe({
        next: (data) => {
          console.log(data);
          if (data._id == undefined || data._id == null) {
            alert('Incorrect Credentials');
          } else {
            alert(`Your password has been changed. Check your email or phone`);
            this.router.navigate(['/security/login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
