import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css'],
})
export class LogOutComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.logOut();
  }

  logOut() {
    this.securityService.deleteSessionData();
    this.router.navigate(['']);
  }
}
