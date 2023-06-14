import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import { RequestModel } from 'src/app/models/Request.model';
import { UserModel } from 'src/app/models/User.model';
import { GuarantorService } from 'src/app/services/parameters/guarantor.service';
import { RequestService } from 'src/app/services/parameters/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-guarantor',
  templateUrl: './create-guarantor.component.html',
  styleUrls: ['./create-guarantor.component.css'],
})
export class CreateGuarantorComponent {
  fGroup: FormGroup = new FormGroup({});
  checkboxValue: boolean = true;
  requestId: number = 0;
  user: UserModel = {};
  request: RequestModel = {};

  constructor(
    private fb: FormBuilder,
    private service: GuarantorService,
    private router: Router,
    private route: ActivatedRoute,
    private security: SecurityService,
    private requestSvc: RequestService
  ) {
    this.requestId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    let data = this.security.sessionValidation();
    if (data != null) {
      this.user = data.user!;
      console.log(data.user);
      this.getRequest();
      this.BuildForm();
      this.buildPhoneInput();
    } else {
      this.router.navigate(['']);
    }
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      secondName: ['', [Validators.minLength(2)]],
      firstLastname: ['', [Validators.required, Validators.minLength(2)]],
      secondLastname: ['', [Validators.minLength(2)]],
      document: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      workingLetter: ['', [Validators.required]],
    });
  }

  getRequest() {
    let filter = {
      where: {
        id: this.requestId,
      },
      include: [
        { relation: 'adviser' },
        { relation: 'client' },
        { relation: 'property' },
        { relation: 'guarantor' },
        { relation: 'requestType' },
        { relation: 'requestStatus' },
      ],
    };
    this.requestSvc.getRequests(filter).subscribe({
      next: (data) => {
        this.request = data.records[0];
        console.log(this.request);
        if (this.request == undefined) {
          this.router.navigate(['/parameters/list-request']);
        }
      },
      error: (err: any) => {
        return (err = true);
      },
    });
  }

  CreateGuarantor() {
    let fields = this.GetFormGroup;
    let data = {
      document: fields['document'].value,
      firstName: fields['firstName'].value,
      secondName: fields['secondName'].value,
      firstLastname: fields['firstLastname'].value,
      secondLastname: fields['secondLastname'].value,
      email: fields['email'].value,
      workingLetter: fields['workingLetter'].value,
      phone: this.getNumber(),
    };
    if (data.phone == '') {
      return alert('Invalid Phone Format');
    }
    this.service.createGuarantor(data).subscribe({
      next: (data) => {
        if (data.id != undefined) {
          let model = {
            id: this.request.id,
            date: this.request.date,
            comment: this.request.comment,
            endOfRent: this.request.endOfRent,
            adviserId: this.request.adviserId,
            clientId: this.request.clientId,
            contractId: this.request.contractId,
            guarantorId: data.id,
            propertyId: this.request.propertyId,
            requestTypeId: this.request.requestTypeId,
            requestStatusId: this.request.requestStatusId,
          };
          console.log(model);
          this.requestSvc.editRequest(model).subscribe({
            next: (data: RequestModel) => {
              alert('Guarantor created successfully');
              this.router.navigate([
                `/parameters/review-request/${this.request.id}`,
              ]);
            },
            error: (err: any) => {
              alert('An Error has happened editing the request');
            },
          });
        }
      },
      error: (err) => {
        alert('An error has occurred.');
      },
    });
  }

  createModel() {}

  buildPhoneInput() {
    const input = document.querySelector('#country');
    intlTelInput(input!, {
      separateDialCode: true,
      autoPlaceholder: 'polite',
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
    });
  }

  getNumber(): string {
    const input = document.querySelector('#country');
    const iti = window.intlTelInputGlobals.getInstance(input!);
    console.log(iti.isValidNumber());
    if (iti.isValidNumber()) {
      return iti.getNumber();
    } else {
      return '';
    }
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }
}
