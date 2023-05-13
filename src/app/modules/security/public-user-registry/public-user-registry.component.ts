import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserModel } from 'src/app/models/user.model';
import { BusinessLogicService } from 'src/app/service/business-logic.service';

@Component({
  selector: 'app-public-user-registry',
  templateUrl: './public-user-registry.component.html',
  styleUrls: ['./public-user-registry.component.css']
})
export class PublicUserRegistryComponent {
    fGroup: FormGroup = new FormGroup({});

    constructor(
      private fb: FormBuilder,
      private businessLogicService : BusinessLogicService
    ){}

    ngOnInit(){
      this.BuildForm();
    }

    BuildForm(){
      this.fGroup = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        secondName: ['', [Validators.minLength(2)]],
        firstLastName: ['', [Validators.required, Validators.minLength(2)]],
        secondLastName: ['', [Validators.minLength(2)]],
        document:['',[Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(12)]],
      });
    }

    Register(){
      let fields = this.GetFormGroup;
      let data = {
        firstName: fields["firstName"].value,
        secondName: fields["secondName"].value,
        firstLastName: fields["firstLastName"].value,
        secondLastName: fields["secondLastName"].value,
        document: fields["document"].value,
        email: fields["email"].value,
        phone: fields["phone"].value
      }
      this.businessLogicService.RegisterPublicUser(data).subscribe({
        next: (response:UserModel) => {
          alert ("Registration successful, please check your email.")
        },
        error:(err) => {
          alert ("An error has occurred.")
        }
        
      })
    }
    get GetFormGroup(){
      return this.fGroup.controls;
    }
}

