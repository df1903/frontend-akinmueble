import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { ContactFormModel } from 'src/app/models/ContactForm.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { ContractsModel } from 'src/app/models/Contract.model';
import { ModelFile } from 'src/app/models/ModelFile.model';
import { ContractsService } from 'src/app/services/parameters/contracts.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-contracts',
  templateUrl: './create-contracts.component.html',
  styleUrls: ['./create-contracts.component.css'],
})
export class CreateContractsComponent {
  activeSession: boolean = false;
  contract: boolean = true;
  guarantor: boolean = true;

  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  fileFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  requestClient: RequestClientModel = {};

  constructor(
    private fb: FormBuilder,
    private ContractSvc: ContractsService,
    private router: Router,
    private security: SecurityService
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (data.user?.roleId == RolesConfig.clientId) {
        this.buildDataFG();
        this.buildFileFG();
      } else {
        this.router.navigate(['/security/login']);
      }
    } else {
      this.router.navigate(['/security/login']);
    }
  }

  sessionValidation() {
    this.security.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (
          (this.requestClient.requestStatusId = 4) ||
          (this.requestClient.requestStatusId = 5)
        ) {
          this.contract = true;
        }
        if ((this.requestClient.requestStatusId = 4)) {
          (this.guarantor = true), (this.contract = true);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  get(): ContractsModel {
    let model = new ContractsModel();

    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    }
    return model;
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      router: ['', [Validators.required]],
    });
  }

  createContract() {
    if (this.dataFG.invalid || this.fileNames.length < 1) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.ContractSvc.createcontract(model).subscribe({
        next: (data: ContractsModel) => {
          alert('Contract Created Successfully');
          let err = false;
          for (let i = 0; i < this.fileNames.length; i++) {
            let contract: ContractsModel = {
              route: this.fileNames[i],
            };
            this.ContractSvc.createcontract(contract).subscribe({
              next: () => {},
              error: (err: any) => {
                return (err = true);
              },
            });
          }
          if (err) {
            alert('An Error has happened uploading the contract');
          } else {
            this.router.navigate(['/parameters/list-property']);
          }
        },
        error: (err: any) => {
          alert('An Error has happened creating the contract');
        },
      });
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileFG.controls['file'].value);
    this.ContractSvc.uploadFile(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fileNames.push(data.file);
        alert('File Upload Successfully');
      },
      error: (err: any) => {
        alert('Error upload file');
      },
    });
  }

  fileSelected(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.getFileFG['file'].setValue(f);
    }
  }

  buildFileFG() {
    this.fileFG = this.fb.group({
      file: ['', []],
    });
  }

  get getFileFG() {
    return this.fileFG.controls;
  }
}
