import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/Adviser.model';
import { PhotoModel } from 'src/app/models/Photo.model';
import { PropertyTypeModel } from 'src/app/models/Property-type.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { CityModel } from 'src/app/models/city.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;
@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent {
  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  fileFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  propertyTypes: PropertyTypeModel[] = [];
  cities: CityModel[] = [];
  advisers: AdviserModel[] = [];
  property: PropertyModel = {};
  propertyId = 0;

  constructor(
    private fb: FormBuilder,
    private propertySvc: PropertyService,
    private citySvc: CityService,
    private adviserSvc: AdviserService,
    private router: Router,
    private security: SecurityService,
    private route: ActivatedRoute
  ) {
    this.propertyId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      if (
        data.user?.roleId == RolesConfig.administratorId ||
        data.user?.roleId == RolesConfig.adviserId
      ) {
        this.getProperty();
        this.getPropertyTypes();
        this.buildDataFG();
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

  buildSelectors() {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }

  buildDataFG() {
    this.dataFG = this.fb.group({
      address: ['', [Validators.required]],
      salePrice: [0, []],
      rentalPrice: [0, []],
      description: ['', [Validators.required]],
      sell: [false, []],
      rent: [false, []],
      video: ['', [Validators.required]],
      propertyTypeId: [-1, [Validators.required]],
      cityId: [-1, [Validators.required]],
      adviserId: [-1, [Validators.required]],
    });
  }

  replaceDataFG() {
    this.dataFG.get('address')?.patchValue(this.property.address);
    this.dataFG.get('salePrice')?.patchValue(this.property.salePrice);
    this.dataFG.get('rentalPrice')?.patchValue(this.property.rentalPrice);
    this.dataFG.get('description')?.patchValue(this.property.description);
    this.dataFG.get('sell')?.patchValue(this.property.sell);
    this.dataFG.get('rent')?.patchValue(this.property.rent);
    this.dataFG.get('video')?.patchValue(this.property.video);
    this.dataFG.get('propertyTypeId')?.patchValue(this.property.propertyTypeId);
    this.dataFG.get('cityId')?.patchValue(this.property.cityId);
    this.dataFG.get('adviserId')?.patchValue(this.property.adviserId);
  }

  getProperty() {
    let filter = {
      include: [
        { relation: 'city' },
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
        this.replaceDataFG();
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

  editProperty() {
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.propertySvc.editProperty(model).subscribe({
        next: (data: PropertyModel) => {
          alert('Property Edited Successfully');
          this.router.navigate(['/parameters/list-property']);
        },
        error: (err: any) => {
          alert('An Error has happened creating the property');
        },
      });
    }
  }

  get(): PropertyModel {
    let model = new PropertyModel();
    model.id = this.property.id;
    model.address = this.getDataFG['address'].value;
    model.salePrice = this.getDataFG['salePrice'].value;
    model.rentalPrice = this.getDataFG['rentalPrice'].value;
    model.description = this.getDataFG['description'].value;
    model.sell = this.getDataFG['sell'].value;
    model.rent = this.getDataFG['rent'].value;
    model.video = this.getDataFG['video'].value;
    model.propertyTypeId = parseInt(this.getDataFG['propertyTypeId'].value);
    model.cityId = parseInt(this.getDataFG['cityId'].value);
    model.adviserId = parseInt(this.getDataFG['propertyTypeId'].value);
    console.log(model);
    if (this.dataFG.invalid) {
      alert('Incomplete Data');
    }
    return model;
  }

  get getDataFG() {
    return this.dataFG.controls;
  }

  onSellCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    this.dataFG.get('sell')?.patchValue(isChecked);
  }

  onRentCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    this.dataFG.get('rent')?.patchValue(isChecked);
  }

  getPropertyTypes() {
    let filter = {};
    this.propertySvc.getPropertyTypes(filter).subscribe({
      next: (data) => {
        this.propertyTypes = data.records;
        this.getCities();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCities() {
    let filter = {};
    this.citySvc.getCities(filter).subscribe({
      next: (data) => {
        let array: CityModel[] = data.records;
        array.sort((a, b) => {
          const nameA = a.name!.toLowerCase();
          const nameB = b.name!.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.cities = array;
        this.getAdvisers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAdvisers() {
    let filter = {};
    this.adviserSvc.getAdvisers(filter).subscribe({
      next: (data) => {
        let array: AdviserModel[] = data.records;
        array.sort((a, b) => {
          const nameA = a.document!;
          const nameB = b.document!;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.advisers = array;
        this.refresh();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  refresh() {
    let filter = {};
    this.propertySvc.getPropertyTypes(filter).subscribe({
      next: () => {
        console.log('Creating elements...');
        this.buildSelectors();
        this.buildCarousel();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /** File Upload */

  buildFileFG() {
    this.fileFG = this.fb.group({
      file: ['', []],
    });
  }

  get getFileFG() {
    return this.fileFG.controls;
  }
}
