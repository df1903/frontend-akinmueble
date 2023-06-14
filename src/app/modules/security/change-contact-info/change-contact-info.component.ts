import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { GeneralVariablesModel } from 'src/app/models/GeneralVariables.model';
import { ChangeContactModel } from 'src/app/models/ChangeContact.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-change-contact-info',
  templateUrl: './change-contact-info.component.html',
  styleUrls: ['./change-contact-info.component.css'],
})
export class ChangeContactInfoComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  contact: GeneralVariablesModel = {};

  constructor(
    private fb: FormBuilder,
    private service: BusinessLogicService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getContact();
        this.buildDataFG();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      realEstateName: [''],
      administratorEmail: ['', [Validators.required]],
      administratorName: ['', [Validators.required]],
    });
  }

  replaceDataFG() {
    this.dataFG.get('realEstateName')?.patchValue(this.contact.realEstateName);
    this.dataFG
      .get('administratorEmail')
      ?.patchValue(this.contact.administratorEmail);
    this.dataFG
      .get('administratorName')
      ?.patchValue(this.contact.administratorName);
  }

  getContact() {
    let filter = {};
    this.service.getGeneralVariables(filter).subscribe({
      next: (data) => {
        this.contact = data[0];
        console.log(this.contact);
        this.replaceDataFG();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  editContact() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.changeGeneralVariables(model).subscribe({
        next: (data: GeneralVariablesModel) => {
          alert('Data changed Successfully');
          this.router.navigate(['/admin-page']);
        },
        error: (err: any) => {
          alert('An Error has happened editing the data');
        },
      });
    }
  }

  get(): ChangeContactModel {
    let model = new ChangeContactModel();
    model.name = this.getDataFG['administratorName'].value;
    model.email = this.getDataFG['administratorEmail'].value;
    console.log(model);
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    }
    return model;
  }

  get getDataFG() {
    return this.dataFG.controls;
  }
}
