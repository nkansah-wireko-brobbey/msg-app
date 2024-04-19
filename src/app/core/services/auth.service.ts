import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(loginData: Ilogin){
    return this.http.post<ILoginResponse>(`${apiEndpoint.authEndpoint.login}`, loginData).pipe(
      tap((response)=>{
        if(response && response.data.token){
          this.tokenService.setToken(response.data.token)
        }
      })
    )
  }

  logout(){
   return this.http.get(`${apiEndpoint.authEndpoint.logout}`).pipe(
    map((response)=>{
        if(response){
          this.tokenService.removeToken();
        }
        return response;
    })
   )

  }
}
