import { Component } from '@angular/core';
import { PropertyTypeModel } from 'src/app/models/Property-type.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';

declare var M: any;

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
})
export class ListPropertyComponent {
  properties: PropertyModel[] = [];

  propertyTypes: PropertyTypeModel[] = [];

  managmentTypes: any = ['sell', 'rent'];

  constructor(private logicService: BusinessLogicService) {}

  ngOnInit() {
    this.getProperties();
    this.buildSelectors();
  }

  buildSelectors() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getProperties() {
    this.logicService.getAllProperties().subscribe({
      next: (properties: any) => {
        this.properties = properties;
        this.buildSelectors();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filterProperties() {
    let list: any[] = [{ sell: false }, { rent: false }];
    const managment = document.getElementById('managment') as HTMLSelectElement;
    const managmentValues = Array.from(managment.selectedOptions).map(
      (option) => option.value
    );

    for (let i = 0; i < list.length; i++) {
      for (let key in list[i]) {
        if (managmentValues.includes(key)) {
          list[i][key] = true;
        }
      }
    }

    let sellType = list[0].sell;
    let rentType = list[1].rent;

    const filter = {
      where: {
        and: [
          { rent: rentType },
          { sell: sellType }
        ]
      }
    };

    this.logicService.getProperties(filter).subscribe({
      next: (properties: any) => {
        this.properties = []
        this.properties = properties
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
