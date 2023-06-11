import { Component } from '@angular/core';
import { PagerConfig } from 'src/app/config/pager.config';
import { PropertyModel } from 'src/app/models/Property.model';
import { PropertyService } from 'src/app/services/parameters/property.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent {
  properties : PropertyModel[] = []
  itemsPerPage: number = PagerConfig.recordPerPage
  page: number = 1
  total: number = 0

  constructor(private service: PropertyService) {
  }

  ngOnInit(){
    this.getProperties()
  }

  getProperties() {
    let limit = PagerConfig.recordPerPage;
    let skip = (this.page - 1) * limit;
    let filter = {
      include: [
        {relation: 'city'},
        {relation: 'propertyType'},
        {relation: 'adviser'}
      ],
      limit: limit,
      skip: skip
    };

    this.service.getProperties(filter).subscribe({
      next: (properties: any) => {
        this.properties = properties.records;
        this.total = properties.total
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
