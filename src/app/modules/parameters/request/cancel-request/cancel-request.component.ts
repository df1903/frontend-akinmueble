import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { ChangeStatusModel } from 'src/app/models/ChangeStatus.model';
import { RequestModel } from 'src/app/models/Request.model';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css'],
})
export class CancelRequestComponent {
  requestId: number = 0;
  request: RequestModel = {};
  logicUrl = RoutesBackendConfig.urlBusinessLogic;
  formattedDate: any;

  constructor(
    private security: SecurityService,
    private service: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.requestId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);

      this.getRequest();
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

  cancelRequest() {
    let change: ChangeStatusModel = {
      requestId: this.request.id,
      status: 6,
    };
    this.service.changeStatus(change).subscribe({
      next: (data: any) => {
        this.router.navigate(['/parameters/list-request']);
        alert('Request Canceled Successfully');
      },
      error: (err: any) => {
        alert('Error canceling the request');
      },
    });
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
        { relation: 'requestType' },
      ],
    };
    this.service.getRequests(filter).subscribe({
      next: (data) => {
        this.request = data.records[0];
        console.log(this.request);
        this.formateDate();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }
}
