import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesConfig } from 'src/app/config/roles.config';
import { RoutesBackendConfig } from 'src/app/config/routes-backend.config';
import { AdviserModel } from 'src/app/models/Adviser.model';
import { PhotoModel } from 'src/app/models/Photo.model';
import { PropertyModel } from 'src/app/models/Property.model';
import { CityModel } from 'src/app/models/City.model';
import { PropertyTypeModel } from 'src/app/models/PropertyType.model';
import { AdviserService } from 'src/app/services/parameters/adviser.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { PropertyService } from 'src/app/services/parameters/property.service';
import { SecurityService } from 'src/app/services/security.service';

declare var M: any;
@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css'],
})
export class CreatePropertyComponent {
  fileNames: any[] = [];
  dataFG: FormGroup = new FormGroup({});
  fileFG: FormGroup = new FormGroup({});
  logicUrl: String = RoutesBackendConfig.urlBusinessLogic;
  propertyTypes: PropertyTypeModel[] = [];
  cities: CityModel[] = [];
  advisers: AdviserModel[] = [];

  constructor(
    private fb: FormBuilder,
    private propertySvc: PropertyService,
    private citySvc: CityService,
    private adviserSvc: AdviserService,
    private router: Router,
    private security: SecurityService
  ) {}

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      console.log(data.user);
      if (
        data.user?.roleId == RolesConfig.administratorId ||
        data.user?.roleId == RolesConfig.adviserId
      ) {
        this.buildDataFG();
        this.buildFileFG();
        this.getPropertyTypes();
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

  createProperty() {
    if (this.dataFG.invalid || this.fileNames.length < 1) {
      alert('Incomplete Data');
    } else {
      let model = this.get();
      this.propertySvc.createProperty(model).subscribe({
        next: (data: PropertyModel) => {
          alert('Property Created Successfully');
          let err = false;
          for (let i = 0; i < this.fileNames.length; i++) {
            let photo: PhotoModel = {
              route: this.fileNames[i],
              propertyId: data.id,
            };
            this.propertySvc.createPhoto(photo).subscribe({
              next: () => {},
              error: (err: any) => {
                return (err = true);
              },
            });
          }
          if (err) {
            alert('An Error has happened uploading the photos');
          } else {
            this.router.navigate(['/parameters/list-property']);
          }
        },
        error: (err: any) => {
          alert('An Error has happened creating the property');
        },
      });
    }
  }

  get(): PropertyModel {
    let model = new PropertyModel();
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

  /** File Upload */

  buildFileFG() {
    this.fileFG = this.fb.group({
      file: ['', []],
    });
  }

  get getFileFG() {
    return this.fileFG.controls;
  }

  uploadFile() {
    this.refresh();
    const formData = new FormData();
    formData.append('file', this.fileFG.controls['file'].value);
    this.propertySvc.uploadPhoto(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fileNames.push(data.file);
        this.refresh();
        alert('File Upload Successfully');
      },
      error: (err: any) => {
        alert('Error upload file');
      },
    });
  }

  fileSelected(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.getFileFG['file'].setValue(f);
    }
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
}
