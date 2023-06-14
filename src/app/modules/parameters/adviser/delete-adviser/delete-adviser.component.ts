import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/adviser.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-delete-adviser',
  templateUrl: './delete-adviser.component.html',
  styleUrls: ['./delete-adviser.component.css'],
})
export class DeleteAdviserComponent {
  adviserId = 0;
  adviser: AdviserModel = {};
  logicUrl = RoutesBackendConfig.urlBusinessLogic;

  constructor(
    private security: SecurityService,
    private service: AdviserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.adviserId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (data.user?.roleId == RolesConfig.administratorId) {
        this.getAdviser();
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  deleteAdviser() {
    this.service.deleteAdviser(this.adviserId).subscribe({
      next: (data) => {
        alert('Adviser Deleted Successfully');
        this.router.navigate(['parameters/list-adviser']);
      },
      error: (err: any) => {
        alert("ERROR: The file can't be accessed or can't be deleted");
      },
    });
  }

  getAdviser() {
    let filter = {
      where: {
        id: this.adviserId,
      },
    };
    this.service.getAdvisers(filter).subscribe({
      next: (data) => {
        this.adviser = data.records[0];
        console.log(this.adviser);
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }
}
