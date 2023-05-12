import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  siteKey: string;

  constructor() {
    this.siteKey = '6Lf17vslAAAAAFwvZUfqtvkn4lWBu9fI_tsl3YIH';
  }
}
