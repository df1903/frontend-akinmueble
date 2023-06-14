import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { ContactFormModel } from 'src/app/models/ContactForm.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { ContractsModel } from 'src/app/models/Contract.model';
import { ModelFile } from 'src/app/models/ModelFile.model';
import { ContractsService } from 'src/app/services/parameters/contracts.service';
import { SecurityService } from 'src/app/services/security.service';
import { RequestModel } from 'src/app/models/Request.model';
import { RequestService } from 'src/app/services/parameters/request.service';
import { UserModel } from 'src/app/models/User.model';
import { AssignContractModel } from 'src/app/models/AssignContract.model';

@Component({
  selector: 'app-create-contracts',
  templateUrl: './create-contracts.component.html',
  styleUrls: ['./create-contracts.component.css'],
})
export class CreateContractsComponent {
  fileFG: FormGroup = new FormGroup({});
  clientRoleId: string = RolesConfig.clientId;
  adviserRoleId: string = RolesConfig.adviserId;
  adminRoleId: string = RolesConfig.administratorId;
  requestId: number = 0;
  clientId: number = 0;
  request: RequestModel = {};
  user: UserModel = {};
  contract: ContractsModel = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private security: SecurityService,
    private service: ContractsService,
    private route: ActivatedRoute,
    private requestSvc: RequestService
  ) {
    this.requestId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null || data != undefined) {
      this.user = data.user!;
      this.getRequest();
    } else {
      this.router.navigate(['']);
    }
  }

  getRequest() {
    let filter = {
      where: {
        id: this.requestId,
      },
    };
    this.requestSvc.getRequests(filter).subscribe({
      next: (data) => {
        this.request = data.records[0];
        console.log(this.request);
        if (this.request != undefined) {
          if (
            this.user?.accountId == this.request.clientId ||
            this.user?.roleId == this.adviserRoleId ||
            this.user?.roleId == this.adminRoleId
          ) {
            this.getContract();
            this.buildFileFG();
          } else {
            this.router.navigate(['/parameters/list-request']);
          }
        } else {
          this.router.navigate(['/parameters/list-request']);
        }
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  getContract() {
    let filter = {
      where: {
        id: this.request.contractId,
      },
    };
    this.service.getContracts(filter).subscribe({
      next: (data) => {
        this.contract = data.records[0];
      },
      error: (err: any) => {
        alert('ERROR getting the contract info');
      },
    });
  }

  buildFileFG() {
    this.fileFG = this.fb.group({
      file: ['', []],
    });
  }

  get getFileFG() {
    return this.fileFG.controls;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileFG.controls['file'].value);
    this.service.uploadFile(formData).subscribe({
      next: (data: any) => {
        console.log(data.file);
        let contract: ContractsModel = {
          route: data.file,
        };
        this.service.createcontract(contract).subscribe({
          next: (data: any) => {
            let contract: AssignContractModel = {
              requestId: this.request.id,
              id: data.id,
            };
            this.service.assignContract(contract).subscribe({
              next: (data: any) => {
                console.log(data);
                this.router.navigate([`/parameters/list-request`]);
                alert('File Upload Successfully');
              },
              error: (err: any) => {
                alert('Error upload file');
              },
            });
          },
          error: (err: any) => {
            alert('Error upload file');
          },
        });
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

  downloadFile() {
    let type = 2;
    let name = this.contract.route!;
    this.service.downloadContract(type, name).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('File Download Successfully');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
