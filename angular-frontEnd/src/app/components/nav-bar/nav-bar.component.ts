import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Notify } from 'notiflix';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(protected authService: AuthService, private router: Router) { }


  onLogoutClick(): boolean {
    this.authService.logoutCurrentUser();
    Notify.info("you are logged out");
    this.router.navigate(["/login"]);
    return false;
  }
}
