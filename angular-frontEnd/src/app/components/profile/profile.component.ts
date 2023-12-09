import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Notify } from 'notiflix';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profileData => {
      //console.log(profileData);
      this.user = profileData;
    });
  }

  fetchData() {
    this.authService.getProfile().subscribe(profileData => {
      console.log("button data: "+profileData)
      this.user = profileData;
    }, (error) => {
      console.log("button fetch: "+error);
    });
  }
}
