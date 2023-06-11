import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PropertyModel } from 'src/app/models/Property.model';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;
@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.css'],
})
export class DeletePropertyComponent {
  propertyId = 0;
  property: PropertyModel = {};
  fileNames: any[] = [];
  logicUrl = RoutesBackendConfig.urlBusinessLogic;

  constructor(
    private security: SecurityService,
    private propertySvc: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.propertyId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.administratorId ||
        data.user?.roleId == RolesConfig.adviserId
      ) {
        this.getProperty();
      } else {
        this.router.navigate(['/security/login']);
      }
    } else {
      this.router.navigate(['/security/login']);
    }
  }

  buildCarousel() {
    let carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel);
  }

  deleteProperty() {
    this.propertySvc.deleteProperty(this.propertyId).subscribe({
      next: (data) => {
        alert('Propertie Deleted Successfully');
        this.router.navigate(['parameters/list-property']);
      },
      error: (err: any) => {
        alert("ERROR: The file can't be accessed or can't be deleted")
      },
    });
  }

  getProperty() {
    let filter = {
      include: [
        { relation: 'city', scope: { include: [{ relation: 'department' }] } },
        { relation: 'propertyType' },
        { relation: 'adviser' },
      ],
      where: {
        id: this.propertyId,
      },
    };
    this.propertySvc.getProperties(filter).subscribe({
      next: (data) => {
        this.property = data.records[0];
        console.log(this.property);
        this.getPhotos();
      },
      error: (err: any) => {
        return (err = true);
      },
    });
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

  refresh() {
    let filter = {};
    this.propertySvc.getPropertyTypes(filter).subscribe({
      next: () => {
        console.log('Creating elements...');
        this.buildCarousel();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
