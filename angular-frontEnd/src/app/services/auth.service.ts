import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators/';
//import { Data } from '../model/Data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>("http://www.localhost:3000/users/register", user, { headers: headers });
  }

  authenticateUser(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>("http://www.localhost:3000/users/authenticate", user, { headers: headers });
  }

  storeUserData(token: string, user: any) {
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
     so when you want full "control" of the key/value pairs in the localStorage object... removeItem() is WAY!
    */
  }
}
