import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/adviser.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { CityModel } from 'src/app/models/city.model';
import { ClientModel } from 'src/app/models/client.model';
import { PropertyTypeModel } from 'src/app/models/propertyType.model';
import { RequestTypeModel } from 'src/app/models/requestType.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { ClientService } from 'src/app/services/parameters/client.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { RequestClientService } from 'src/app/services/parameters/requestClient.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;
@Component({
  selector: 'app-create-request-client',
  templateUrl: './create-request-client.component.html',
  styleUrls: ['./create-request-client.component.css'],
})
export class CreateRequestClientComponent {
  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  fileFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  propertyTypes: PropertyTypeModel[] = [];
  cities: CityModel[] = [];
  advisers: AdviserModel[] = [];
  property: PropertyModel[] = [];
  requestType: RequestTypeModel[] = [];

  requestClient :RequestClientModel = new RequestClientModel()

  date: any
  comment: any
  endOfRent: any
  adviserId: any
  clientId: any
  contractId: any
  guarantorId: any
  propertyId: any
  requestTypeId: any
  requestStatusId: any

  constructor(
    private fb: FormBuilder,
    private propertySvc: PropertyService,
    private clientSvc : ClientService,
    private adviserSvc: AdviserService,
    private router: Router,
    private security: SecurityService,
    private requestSvc : RequestClientService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.comment = params['comment'];
      this.adviserId = Number(params['adviserId']);
      this.clientId = Number(params['clientId']);
      this.contractId = Number(params['ContarctId']);
      this.guarantorId = Number(params['guarantorId']);
      this.propertyId = Number(params['propertyId']);
      this.requestTypeId = Number(params['requestTypeId']);
      const fechaHoy = new Date();
      this.date = fechaHoy
      const fechaSolicitud = this.convertDateFormat(fechaHoy);
      this. endOfRent = fechaSolicitud;
      this.adviserSvc.getAdvisers(this.adviserId).subscribe({
        next: (datos) => {
          this.adviserId = datos
          const datosUsuario: ClientModel = new ClientModel
          if (datosUsuario) {
            const correoCliente = datosUsuario.email;
            this.clientSvc.getClients(correoCliente).subscribe({
              next: (datos) => {
                this.clientId = datos

                this.requestSvc.createRequestClient(datos).subscribe({
                  next: (datos) => {
                    alert("")

                  },
                  error: (err) => {
                    console.log(err)
                  }
                });
              },
              error: (err) => {
                // Manejo de error
              }
            });
          }
        },
        error: (err) => {
          // Manejo de error
        }
      });

    });
  }


  convertDateFormat(inputDate: Date): Date {
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    const formattedDate = `${year}-${month}-${day} ${currentTime}`;

    return new Date(formattedDate);
  }

  getClient() {
    let filter = {
      where: {
        id: this.requestClient.clientId,
      },
    };
    this.clientSvc.getClients(filter).subscribe({
      next: (data) => {
        this.clientId = data.records[0];
        console.log(this.clientId);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
