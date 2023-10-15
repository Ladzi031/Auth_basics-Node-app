import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

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

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    const isValidRegister: boolean = this.validateService.validateRegister(user);
    const isValidEmail: boolean = this.validateService.validateEmail(this.email);

    if (isValidRegister && isValidEmail) {

      //console.log("everything seems fine!");
    }
    else {
      //console.log("something is wrong!");
    }
  }

}
