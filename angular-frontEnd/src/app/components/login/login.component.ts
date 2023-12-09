import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name !: string;
  password !: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLoginSubmit() {
    const loginUser: any = {
      name: this.name,
      password: this.password
    }
    this.authService.authenticateUser(loginUser).subscribe(data => {
      if (data.success) {

        this.authService.storeUserData(data.token, data.user);
        Notify.success(data.msg);
        this.router.navigate(["dashboard"]);
        
      } else {
        Notify.failure(data.msg);
      }
    });
  }
}
