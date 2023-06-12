import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PagerConfig } from 'src/app/config/page.config';
import { RolesConfig } from 'src/app/config/roles.config';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { RequestClientService } from 'src/app/services/parameters/requestClient.service';
import { SecurityService } from 'src/app/services/security.service';


@Component({
  selector: 'app-list-request-client',
  templateUrl: './list-request-client.component.html',
  styleUrls: ['./list-request-client.component.css']
})
export class ListRequestClientComponent {
  requestClient: RequestClientModel[] = [];
  itemsPerPage: number = PagerConfig.recordPerPage;
  page: number = 1;
  total: number = 0;

  constructor(
    private service: RequestClientService,
    private security: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.clientId
      ) {
        this.get();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  get() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter = {
      include: [
        {relation: 'request'}
      ],
      limit: limit,
      skip: skip,
    };

    this.service.getRequestClient(filter).subscribe({
      next: (data: any) => {
        console.log(data.records)
        this.requestClient = data.records;
        this.total = data.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
