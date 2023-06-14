import { Component } from '@angular/core';
import { take } from 'rxjs';
import { PagerConfig } from 'src/app/config/pager.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { PhotoModel } from 'src/app/models/Photo.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { PropertyService } from 'src/app/services/parameters/property.service';

declare var M: any;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent {
  properties: PropertyModel[] = [];

  photos: PhotoModel[] = [];

  managmentTypes: any = ['sell', 'rent'];

  page: number = 1;
  recordPerPage: number = PagerConfig.recordPerPage;
  total: number = 0;

  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;

  backupImageUrl: string = '../../../assets/properties/0_template.png';

  constructor(private service: PropertyService) {}

  ngOnInit() {
    this.getProperties();
    this.getPhotos();
    this.buildSelectors();
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getPhotos() {
    let filter = {};
    this.service.getPhotos(filter).subscribe({
      next: (photos: any) => {
        this.photos = photos;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getProperties() {
    const managment = document.getElementById('managment') as HTMLSelectElement;
    const managmentValues = Array.from(managment.selectedOptions).map(
      (option) => option.value
    );

    let sellType = managmentValues.includes('sell');
    let rentType = managmentValues.includes('rent');
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;

    let filter;
    if (sellType == false && rentType == false) {
      filter = {
        include: [
          {
            relation: 'city',
            scope: { include: [{ relation: 'department' }] },
          },
          { relation: 'propertyType' },
          { relation: 'adviser' },
        ],
      };
    } else {
      filter = {
        where: {
          and: [{ rent: rentType }, { sell: sellType }],
        },
        include: [
          {
            relation: 'city',
            scope: { include: [{ relation: 'department' }] },
          },
          { relation: 'propertyType' },
          { relation: 'adviser' },
        ],
        limit: limit,
        skip: skip,
      };
    }

    this.service.getProperties(filter).subscribe({
      next: (properties: any) => {
        this.properties = properties.records;
        this.total = properties.total;
        this.buildSelectors();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getPhoto(id: number) {
    let photos = this.photos.filter((photo) => photo.propertyId === id);
    if (photos.length > 0) {
      return photos[0].route;
    }
    return Error;
  }

  handleImageError(event: Event) {
    const imgElement: HTMLImageElement = event.target as HTMLImageElement;
    imgElement.src = this.backupImageUrl;
  }
}
