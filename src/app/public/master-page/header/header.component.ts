import { Component } from '@angular/core';
import { UserValidatedModel } from 'src/app/models/UserValidated.model copy';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeSession: boolean = false;

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
    this.sessionValidation();
  }

  sessionValidation() {
    this.securityService.getSessionData().subscribe({
      next: (data: UserValidatedModel) => {
        if (data.token != '') {
          this.activeSession = true;
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
