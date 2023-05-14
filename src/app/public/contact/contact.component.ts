import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import * as intlTelInput from 'intl-tel-input';

declare var M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  messageType = ['Suggestions', 'Issues', 'Claims', 'Complaints'];
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private bussinesLogicService: BusinessLogicService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formBuild();
    this.messageTypeSelector();
    this.buildSelector();
  }

  ngAfterViewInit() {
    this.messageTypeSelector();
  }

  messageTypeSelector() {
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

  send() {
    if (this.fGroup.invalid) {
      alert('Incomplete Data');
    } else {
      let contactForm = {
        fullName: this.GetFormGroup['fullName'].value,
        messageType: this.GetFormGroup['messageType'].value,
        email: this.GetFormGroup['email'].value,
        phone: this.getNumber(),
        message: this.GetFormGroup['message'].value,
      };
      console.log(contactForm);
      this.bussinesLogicService.SendContactForm(contactForm).subscribe({
        next: (data) => {
          if (data != null || data != undefined) {
            alert('Message Sent Successfully');
            this.router.navigate(['']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  formBuild() {
    this.fGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      messageType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  buildSelector() {
    const input = document.querySelector('#country');
    intlTelInput(input!, {
      separateDialCode: true,
      autoPlaceholder: 'polite',
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
    });
  }

  getNumber(): string | any {
    const input = document.querySelector('#country');
    const iti = window.intlTelInputGlobals.getInstance(input!);
    console.log(iti.isValidNumber());
    if (iti.isValidNumber()) {
      return iti.getNumber();
    } else {
      return alert('Invalid Phone Format');
    }
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }
}
