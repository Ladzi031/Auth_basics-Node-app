import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Data } from '../model/Data';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators/';




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
}
