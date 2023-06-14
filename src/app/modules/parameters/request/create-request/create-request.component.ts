import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/Adviser.model';
import { ClientModel } from 'src/app/models/Client.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestModel } from 'src/app/models/Request.model';
import { UserModel } from 'src/app/models/User.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { ClientService } from 'src/app/services/parameters/client.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';
import { format } from 'date-fns';

declare var M: any;

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css'],
})
export class CreateRequestComponent {
  fileNames: any[] = [];
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  property: PropertyModel = {};
  propertyId: number = 0;
  client: ClientModel = {};
  user: UserModel = {};
  adviser: AdviserModel = {};
  clientRoleId = RolesConfig.clientId;

  constructor(
    private propertySvc: PropertyService,
    private adviserSvc: AdviserService,
    private clientSvc: ClientService,
    private requestSvc: RequestService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.propertyId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.clientId) {
        this.user = data.user!;
        console.log(data.user);
        this.getProperty();
        this.getPhotos();
        this.getClient();
        this.getAdviser();
      } else {
        this.router.navigate(['/parameters/list-request']);
      }
    } else {
      this.router.navigate(['/security/login']);
    }
  }

  buildCarousel() {
    let carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel);
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
        id: this.user.accountId,
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

  getAdviser() {
    let filter = {
      where: {
        id: this.property.adviserId,
      },
    };
    this.adviserSvc.getAdvisers(filter).subscribe({
      next: (data) => {
        this.adviser = data.records[0];
        console.log(this.adviser);
        this.refresh();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  request(type: number) {
    let request: RequestModel = {
      date: new Date(),
      adviserId: this.property.adviserId,
      clientId: this.user.accountId,
      propertyId: this.property.id,
      requestStatusId: 1,
      requestTypeId: type,
    };
    this.requestSvc.createRequest(request).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/parameters/list-request']);
        alert('Request created successfully');
      },
      error: (err: any) => {
        alert('Error request create');
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
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
