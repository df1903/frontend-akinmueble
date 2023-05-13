import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  messageType = ['Suggestions', 'Issues', 'Claims', 'Complaints'];
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.messageTypeSelector();
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
      let fullName = this.GetFormGroup['fullName'].value;
      let messageType = this.GetFormGroup['messageType'].value;
      let email = this.GetFormGroup['email'].value;
      let phone = this.GetFormGroup['phone'].value;
      let message = this.GetFormGroup['message'].value;

      console.log(fullName, messageType, email, phone, message);
    }
  }

  buildForm() {
    this.fGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      messageType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }
}
