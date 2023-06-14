import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AssignContractModel } from 'src/app/models/AssignContract.model';
import { ChangeStatusModel } from 'src/app/models/ChangeStatus.model';
import { ClientModel } from 'src/app/models/Client.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestModel } from 'src/app/models/Request.model';
import { UserModel } from 'src/app/models/User.model';
import { ClientService } from 'src/app/services/parameters/client.service';
import { ContractsService } from 'src/app/services/parameters/contracts.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;

@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css'],
})
export class ReviewRequestComponent {
  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  request: RequestModel = {};
  requestId: number = 0;
  property: PropertyModel = {};
  propertyId: number = 0;
  client: ClientModel = {};
  user: UserModel = {};
  clientRoleId = RolesConfig.clientId;

  constructor(
    private fb: FormBuilder,
    private service: RequestService,
    private propertySvc: PropertyService,
    private clientSvc: ClientService,
    private contractSvc: ContractsService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.requestId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.administratorId ||
        data.user?.roleId == RolesConfig.adviserId
      ) {
        this.getRequest();
        this.buildDataFG();
      } else {
        this.router.navigate(['/parameters/list-request']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      comment: [''],
    });
  }

  get getDataFG() {
    return this.dataFG.controls;
  }

  buildCarousel() {
    let carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel);
  }

  getRequest() {
    let filter = {
      where: {
        id: this.requestId,
      },
      include: [
        { relation: 'adviser' },
        { relation: 'client' },
        { relation: 'property' },
        { relation: 'guarantor' },
        { relation: 'requestType' },
        { relation: 'requestStatus' },
      ],
    };
    this.service.getRequests(filter).subscribe({
      next: (data) => {
        this.request = data.records[0];
        this.propertyId = this.request.propertyId!;
        console.log(this.request);
        this.replaceDataFG();
        this.getProperty();
        this.getPhotos();
        this.getClient();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  getPhotos() {
    let filter = {
      where: {
        propertyId: this.propertyId,
      },
    };
    this.propertySvc.getPhotos(filter).subscribe({
      next: (data) => {
        this.fileNames = data;
        console.log(this.fileNames);
        this.refresh();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getProperty() {
    let filter = {
      where: {
        id: this.propertyId,
      },
      include: [
        { relation: 'propertyType' },
        {
          relation: 'city',
          scope: { include: [{ relation: 'department' }] },
        },
      ],
    };
    this.propertySvc.getProperties(filter).subscribe({
      next: (data) => {
        this.property = data.records[0];
        console.log(this.property);
        this.refresh();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getClient() {
    let filter = {
      where: {
        id: this.request.clientId,
      },
    };
    this.clientSvc.getClients(filter).subscribe({
      next: (data) => {
        this.client = data.records[0];
        console.log(this.client);
        this.refresh();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  refresh() {
    let filter = {};
    this.propertySvc.getPropertyTypes(filter).subscribe({
      next: () => {
        console.log('Creating elements...');
        this.buildCarousel();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  acceptRequest() {
    let change: ChangeStatusModel = {
      requestId: this.request.id,
      status: 5,
    };
    let contract: AssignContractModel = {
      requestId: this.request.id,
      id: 1,
    };
    this.service.changeStatus(change).subscribe({
      next: (data: any) => {
        this.router.navigate(['/parameters/list-request']);
        alert('The Request has been accepted');
      },
      error: (err: any) => {
        alert('Error changing the status');
      },
    });
  }

  rejectRequest() {
    let comment = this.getDataFG['comment'].value;
    let change: ChangeStatusModel = {
      requestId: this.request.id,
      status: 3,
    };
    if (comment != '') {
      this.service.changeStatus(change).subscribe({
        next: (data: any) => {
          this.router.navigate(['/parameters/list-request']);
          alert('The Request has been Rejected');
        },
        error: (err: any) => {
          alert('Error changing the status');
        },
      });
    } else {
      alert('You must leave a comment');
    }
  }

  guarantorRequest() {
    let change: ChangeStatusModel = {
      requestId: this.request.id,
      status: 4,
    };
    this.service.changeStatus(change).subscribe({
      next: (data: any) => {
        this.router.navigate(['/parameters/list-request']);
        alert('The Request has been accepted with guarantor');
      },
      error: (err: any) => {
        alert('Error changing the status');
      },
    });
  }

  replaceDataFG() {
    this.dataFG.get('comment')?.patchValue(this.request.comment);
  }

  goToContract(id: any) {
    this.router.navigate([`/parameters/create-contracts/${id}`]);
  }
}
