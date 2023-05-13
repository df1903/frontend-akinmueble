import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralConfig } from 'src/app/config/general.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  siteKey: string = GeneralConfig.recaptchaSiteKey;
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router) {}

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
      alert('Incorrect Credentials');
    } else {
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
