import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/adviser.model';
import { RequestModel } from 'src/app/models/Request.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css'],
})
export class EditRequestComponent {
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  request: RequestModel = {};
  requestId = 0;
  advisers: AdviserModel[] = [];
  formattedDate: any;

  constructor(
    private fb: FormBuilder,
    private service: RequestService,
    private adviserSvc: AdviserService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.requestId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getRequest();
        this.getAdvisers();
        this.buildDataFG();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  formateDate() {
    this.formattedDate = this.datePipe.transform(
      this.request.date,
      'yyyy-MM-ddTHH:mm:ss'
    );
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      comment: ['', [Validators.required]],
      endOfRent: ['', [Validators.required]],
      adviserId: ['', [Validators.required]],
    });
  }

  replaceDataFG() {
    this.dataFG.get('comment')?.patchValue(this.request.comment);
    this.dataFG.get('endOfRent')?.patchValue(this.formattedDate);
    this.dataFG.get('adviserId')?.patchValue(this.request.adviserId);
  }

  getAdvisers() {
    let filter = {};
    this.adviserSvc.getAdvisers(filter).subscribe({
      next: (data) => {
        let array: AdviserModel[] = data.records;
        array.sort((a, b) => {
          const nameA = a.document!;
          const nameB = b.document!;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.advisers = array;
        this.refresh();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  refresh() {
    let filter = {};
    this.service.getRequests(filter).subscribe({
      next: () => {
        console.log('Creating elements...');
        this.buildSelectors();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRequest() {
    let filter = {
      where: {
        id: this.requestId,
      },
    };
    this.service.getRequests(filter).subscribe({
      next: (data) => {
        this.request = data.records[0];
        console.log(this.request);
        this.formateDate();
        this.replaceDataFG();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  editRequest() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.service.editRequest(model).subscribe({
        next: (data: RequestModel) => {
          alert('Request Edited Successfully');
          this.router.navigate(['/parameters/list-request']);
        },
        error: (err: any) => {
          alert('An Error has happened editing the request');
        },
      });
    }
  }

  changeAdviser() {
    let request = this.request;
    request.adviserId = parseInt(this.getDataFG['adviserId'].value);
    this.service.changeAdviser(request).subscribe({
      next: (data: any) => {
        this.get();
        alert('Adviser changed successfully');
      },
      error: (err: any) => {
        alert('Error changing the adviser');
      },
    });
  }

  get(): RequestModel {
    let model = new RequestModel();
    model.id = this.request.id;
    model.date = this.request.date;
    model.comment = this.getDataFG['comment'].value;
    model.endOfRent = this.getDataFG['endOfRent'].value;
    model.adviserId = this.request.adviserId;
    model.clientId = this.request.clientId;
    model.contractId = this.request.contractId;
    model.guarantorId = this.request.guarantorId;
    model.propertyId = this.request.propertyId;
    model.requestTypeId = this.request.requestTypeId;
    model.requestStatusId = this.request.requestStatusId;
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
