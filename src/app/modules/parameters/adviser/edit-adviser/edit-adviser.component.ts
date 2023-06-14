import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/adviser.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { SecurityService } from 'src/app/services/security.service';
import * as intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-edit-adviser',
  templateUrl: './edit-adviser.component.html',
  styleUrls: ['./edit-adviser.component.css'],
})
export class EditAdviserComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  adviser: AdviserModel = {};
  adviserId = 0;

  constructor(
    private fb: FormBuilder,
    private service: AdviserService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.adviserId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getAdviser();
        this.buildDataFG();
        this.buildPhoneInput();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      document: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastname: ['', [Validators.required]],
      secondLastname: [''],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  replaceDataFG() {
    this.dataFG.get('document')?.patchValue(this.adviser.document);
    this.dataFG.get('firstName')?.patchValue(this.adviser.firstName);
    this.dataFG.get('secondName')?.patchValue(this.adviser.secondName);
    this.dataFG.get('firstLastname')?.patchValue(this.adviser.firstLastname);
    this.dataFG.get('secondLastname')?.patchValue(this.adviser.secondLastname);
    this.dataFG.get('email')?.patchValue(this.adviser.email);
    this.dataFG.get('phone')?.patchValue(this.adviser.phone);
  }

  getAdviser() {
    let filter = {
      where: {
        id: this.adviserId,
      },
    };
    this.service.getAdvisers(filter).subscribe({
      next: (data) => {
        this.adviser = data.records[0];
        console.log(this.adviser);
        this.replaceDataFG();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  editAdviser() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      if (model) {
        this.service.editAdviser(model).subscribe({
          next: (data: AdviserModel) => {
            alert('Adviser Edited Successfully');
            this.router.navigate(['/parameters/list-adviser']);
          },
          error: (err: any) => {
            alert('An Error has happened editing the Adviser');
          },
        });
      }
    }
  }

  get(): AdviserModel | null {
    let model = new AdviserModel();
    model.id = this.adviser.id;
    model.document = this.getDataFG['document'].value;
    model.firstName = this.getDataFG['firstName'].value;
    model.secondName = this.getDataFG['secondName'].value;
    model.firstLastname = this.getDataFG['firstLastname'].value;
    model.secondLastname = this.getDataFG['secondLastname'].value;
    model.email = this.getDataFG['email'].value;
    model.phone = this.getNumber();
    model.accepted = this.adviser.accepted;
    console.log(model);
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
      return null;
    } else if (model.phone == '') {
      alert('Invalid phone');
      return null;
    } else {
      return model;
    }
  }

  get getDataFG() {
    return this.dataFG.controls;
  }

  buildPhoneInput() {
    const input = document.querySelector('#country');
    intlTelInput(input!, {
      separateDialCode: true,
      autoPlaceholder: 'polite',
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
    });
  }

  getNumber(): string {
    const input = document.querySelector('#country');
    const iti = window.intlTelInputGlobals.getInstance(input!);
    console.log(iti.isValidNumber());
    if (iti.isValidNumber()) {
      return iti.getNumber();
    } else {
      return '';
    }
  }
}
