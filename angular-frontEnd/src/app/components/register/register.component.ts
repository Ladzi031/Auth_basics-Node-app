import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ValidateService } from 'src/app/services/validate.service';
import { Notify } from 'notiflix';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

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

    // let's register this user...
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        Notify.success("You are now registered, you can login!");
        console.log(data.msg);
        // redirect user
        this.router.navigate(["/login"]);
        return true;
      } else {
        Notify.failure("something went wrong!");
        this.router.navigate(["/register"]);
        return false;
      }
    })
    return true; // to avoid the error
  }

}
