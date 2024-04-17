import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginData: Ilogin){
    return this.http.post(`${apiEndpoint.authEndpoint.login}`, loginData);
  }

  logout(){

  }
}
