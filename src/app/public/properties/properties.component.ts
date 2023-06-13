import { Component } from '@angular/core';
import { PagerConfig } from 'src/app/config/pager.config';
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

  photos: PhotoModel[] = []

  managmentTypes: any = ['sell', 'rent'];

  page: number = 1;
  recordPerPage: number = PagerConfig.recordPerPage
  total: number = 0;

  constructor(private service: PropertyService) {}

  ngOnInit() {
    this.getProperties();
    this.buildSelectors();
    this.getPhotos()
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getProperties() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    this.service.getAllProperties(this.page).subscribe({
      next: (properties: any) => {
        this.properties = properties.records;
        this.total = properties.total
        this.buildSelectors();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getPhotos() {
    this.service.getPhotos().subscribe({
      next: (photos: any) => {
        this.photos = photos
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filterProperties() {
    const managment = document.getElementById('managment') as HTMLSelectElement;
    const managmentValues = Array.from(managment.selectedOptions).map(
      (option) => option.value
    );

    let sellType = managmentValues.includes("sell");
    let rentType = managmentValues.includes("rent");
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;

    let filter
    if (sellType == false && rentType == false) {
      filter = {}
    } else {
      filter = {
        where: {
          and: [
            { rent: rentType },
            { sell: sellType }
          ]
        },
        limit: limit,
        skip: skip
      };
    }


    this.service.getProperties(filter).subscribe({
      next: (properties: any) => {
        this.properties = []
        this.properties = properties.records
        this.total = properties.total
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getPhoto(id: number) {
    let photos = this.photos.filter(photo => photo.propertyId === id);
    if (photos[0] != undefined){
      return photos[0].route
    }
    return "photo1.jpg"
  }
}
