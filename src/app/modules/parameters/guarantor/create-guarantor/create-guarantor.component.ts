import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { GuarantorService } from 'src/app/services/parameters/guarantor.service';

@Component({
  selector: 'app-create-guarantor',
  templateUrl: './create-guarantor.component.html',
  styleUrls: ['./create-guarantor.component.css']
})
export class CreateGuarantorComponent {

  fGroup: FormGroup = new FormGroup({});
  checkboxValue: boolean = false;

  constructor(
    private fb: FormBuilder,
    private businessLogicService: BusinessLogicService,
    private service : GuarantorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.BuildForm();
    this.buildPhoneInput();
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

  RegisterAdviser() {
    let fields = this.GetFormGroup;
    let data = {
      document: fields['document'].value,
      firstName: fields['firstName'].value,
      secondName: fields['secondName'].value,
      firstLastname: fields['firstLastname'].value,
      secondLastname: fields['secondLastname'].value,
      email: fields['email'].value,
      phone: this.getNumber(),
      workingLetter: fields['workingLetter'].value
    };
    if (data.phone == '') {
      return alert('Invalid Phone Format');
    }
    this.service.createGuarantor(data).subscribe({
      next: (data) => {
        if (data.id != undefined) {
          alert('Creacion Guarantor successful');
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        alert('An error has occurred.');
      },
    });
  }

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
