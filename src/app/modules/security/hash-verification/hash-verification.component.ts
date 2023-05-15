import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessLogicService } from 'src/app/services/business-logic.service';

@Component({
  selector: 'app-hash-verification',
  templateUrl: './hash-verification.component.html',
  styleUrls: ['./hash-verification.component.css'],
})
export class HashVerificationComponent implements OnInit {
  error = false;
  validation = false;
  hash: string = '';

  constructor(
    private businessLogicService: BusinessLogicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.hash = this.route.snapshot.params['hash'];
    this.hashVerification();
  }

  hashVerification() {
    this.businessLogicService.hashVerification(this.hash).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.validation = res;
        } else {
          this.error = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
