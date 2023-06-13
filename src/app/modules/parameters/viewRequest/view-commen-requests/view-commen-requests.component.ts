import { Component } from '@angular/core';
import { PropertyModel } from 'src/app/models/Property.model';
import { RequestClientModel } from 'src/app/models/RequestClient.model';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-view-commen-requests',
  templateUrl: './view-commen-requests.component.html',
  styleUrls: ['./view-commen-requests.component.css']
})
export class ViewCommenRequestsComponent {
  activeSession: boolean = false;
  isExpanded: boolean = false;
  dropdownStates: boolean[] = [];
  user: UserModel = new UserModel();
  requestClient: RequestClientModel = new RequestClientModel();
  property: PropertyModel = new PropertyModel();

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
    this.sessionValidation();
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.activeSession = true;
          this.user = data.user!;
        } else {
          this.activeSession = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
