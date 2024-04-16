import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../models/auth.model';
import { apiEndpoint } from '../constants/constatns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginData: Ilogin){
      this.http.post(`${apiEndpoint.authEndpoint.login}`, loginData)
  }

  logout(){

  }
}
