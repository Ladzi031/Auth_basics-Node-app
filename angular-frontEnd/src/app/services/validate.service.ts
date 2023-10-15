import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: User): boolean {
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    }else {
      return true;
    }
  }

  validateEmail(email: string) : boolean {

    const re :RegExp = /\S+@\S+\.\S+/;

    return re.test(email);
  }
}
