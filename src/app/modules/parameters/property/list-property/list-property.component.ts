import { Component } from '@angular/core';
import { PropertyModel } from 'src/app/models/Property.model';

declare var M: any;

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
})
export class ListPropertyComponent {
  properties: PropertyModel[] = [
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: true,
      rent: true,
      video: '',
      photo: ['../../../../../assets/properties/1.jpg'],
      propertyTypeId: 'House',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: true,
      rent: true,
      video: '',
      photo: ['../../../../../assets/properties/2.jpg'],
      propertyTypeId: 'Apartment',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: true,
      rent: true,
      video: '',
      photo: ['../../../../../assets/properties/3.jpg'],
      propertyTypeId: 'Mansion',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: true,
      rent: true,
      video: '',
      photo: ['../../../../../assets/properties/2.jpg'],
      propertyTypeId: 'Apartment',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: false,
      rent: true,
      video: '',
      photo: ['../../../../../assets/properties/3.jpg'],
      propertyTypeId: 'Mansion',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
    {
      id: 1,
      address: 'Carrera 12C',
      salePrice: 10000,
      rentalPrice: 100,
      description: 'A beautiful apartment for you',
      sell: true,
      rent: false,
      video: '',
      photo: ['../../../../../assets/properties/1.jpg'],
      propertyTypeId: 'House',
      cityId: 'Manizales',
      requests: [],
      adviserId: 'Kevin Lopez',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.buildSelectors();
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }
}
