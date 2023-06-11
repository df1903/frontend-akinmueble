import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.css']
})
export class DeletePropertyComponent {
  constructor(private security: SecurityService, private router: Router){
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user)
      if (data.user?.roleId == RolesConfig.administratorId || data.user?.roleId == RolesConfig.adviserId){
      } else {
        this.router.navigate(['/security/login']);
      }
    } else {
      this.router.navigate(['/security/login']);
    }
  }
}
