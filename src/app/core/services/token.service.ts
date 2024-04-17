import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {constants} from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { 

    const token = this.getToken()
    if(token) this.updateToken(true);

  }

  updateToken(status: boolean){
    this.isAuthenticated.next(status);
  }

  getToken() : string | null{
    return localStorage.getItem(constants.CURRENT_TOKEN) || null;
  }

  setToken(token: string){
    localStorage.setItem(constants.CURRENT_TOKEN,token);
    this.updateToken(true)
  }

  removeToken(){
    localStorage.removeItem(constants.CURRENT_TOKEN)
    this.updateToken(false)
  }
}
