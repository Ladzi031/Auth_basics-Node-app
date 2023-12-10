import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { map } from 'rxjs/operators/';
//import { Data } from '../model/Data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  registerUser(user: User): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>("users/register", user, { headers: headers });
  }

  authenticateUser(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>("users/authenticate", user, { headers: headers });
  }
  getProfile(): Observable<any> {
    // get data from a protected endpoint...
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get<any>("users/profile", { headers: headers });

    /*
    Note to Self:
    HttpHeader is immutable, so for every call of the append() method, a new object is returned...
     */
  }

  storeUserData(token: string, user: any): void {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user)); // local_storage can only store strings.
    this.authToken = token;
    this.user = user;

  }

  logoutCurrentUser(): void {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");

    /* localStorage object is domian-specific:
      -> the method: localStorage.clear(); 
     Is also fine to use, but as the name goes "clear()" all! ...
     so when you want full "control" of the key/value pairs in the localStorage object... removeItem() is the WAY!
    */
  }

  isTokenExpired(): boolean | Promise<boolean> {
    return this.jwtHelper.isTokenExpired(this.authToken);
  }
  private loadToken(): void {
    const token: string | null = localStorage.getItem("id_token");
    this.authToken = token;
  }

}
