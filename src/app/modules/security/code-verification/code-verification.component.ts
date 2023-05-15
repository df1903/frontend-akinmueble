import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css'],
})
export class CodeVerificationComponent implements OnInit {
  userId: string = '';
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.securityService.getUserData();
    if (data != null) {
      this.userId = data._id!;
      this.formBuild();
    } else {
      this.router.navigate(['/security/login']);
    }
  }

  formBuild() {
    this.fGroup = this.fb.group({
      code: ['', [Validators.required]],
    });
  }

  verificationCode() {
    if (this.fGroup.invalid) {
      alert('You must enter the verification code');
    } else {
      let code = this.getFormGroup['code'].value;
      this.securityService.userCodeVerification(this.userId, code).subscribe({
        next: (data: UserValidatedModel) => {
          console.log(data);
          if (
            data.token != null &&
            data.token != undefined &&
            data.token != ''
          ) {
            this.securityService.buildSideMenu(data.menu);
            this.securityService.storeUserValidatedData(data);
            this.router.navigate(['']);
          } else {
            alert('Invalid Code');
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
