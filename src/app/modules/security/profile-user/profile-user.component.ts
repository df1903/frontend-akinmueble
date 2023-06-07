import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/User.model';
import { UserValidatedModel } from 'src/app/models/UserValidated.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {

  activeSession: boolean = false;
  isExpanded: boolean = false;
  dropdownStates: boolean[] = [];
  user: UserModel = new UserModel();

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
