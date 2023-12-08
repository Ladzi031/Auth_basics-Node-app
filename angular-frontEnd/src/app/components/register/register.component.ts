import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ValidateService } from 'src/app/services/validate.service';
import { Notify } from 'notiflix';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name !: string;
  username !: string;
  email !: string;
  password !: string;

  constructor(private validateService: ValidateService) {

  }

  ngOnInit(): void { }

  onRegisterSubmit(): boolean {

    const user: User = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    // required fields...
    if (!this.validateService.validateRegister(user)) {
      Notify.failure("please fill in all fields");
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      Notify.failure("the email entered is invalid!");
      return false;
    }
    
    return true;
  }

}
