import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { RequestClientService } from 'src/app/services/parameters/requestClient.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-delete-request-client',
  templateUrl: './delete-request-client.component.html',
  styleUrls: ['./delete-request-client.component.css']
})
export class DeleteRequestClientComponent {
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  requestClient: RequestClientModel = {};
  requestClientId = 0;
  dataFG: any;

  constructor(
    private service: RequestClientService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.requestClientId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (data.user?.roleId == RolesConfig.clientId) {
        this.getrequestClient();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  /*buildSelectors() {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }*/

  getrequestClient() {
    let filter = {
      include: [{ relation: 'property' }],
      where: {
        id: this.requestClientId,
      },
    };
    this.service.getRequestClient(filter).subscribe({
      next: (data) => {
        this.requestClient = data.records[0];
        console.log(this.requestClient);
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  deleteRequestClient() {

    if (this.requestClientId !== undefined && this.requestClient?.clientId !== undefined) {
       this.service.DeleteRequestClient(this.requestClientId, this.requestClient?.clientId).subscribe({
        next: (data: RequestClientModel) => {
          alert('The request was successfully deleted.');
          this.router.navigate(['/parameters/list-requestClient']);
        },
        error: (err: any) => {
          alert('An error occurred while deleting the request.');
        },
    })};
  }

}

