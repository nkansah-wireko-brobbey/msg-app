import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin, ILoginResponse, IRegister, IRegisterReponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import { map, tap } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private socketService: SocketService
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

  register(registerData: IRegister){
    return this.http.post<IRegisterReponse>(`${apiEndpoint.authEndpoint.register}`,registerData)
      .pipe(
        tap(
          (response)=>{
          if(response && response?.data.token){
            this.tokenService.setToken(response.data.token)
          }
            }
          )
    )
  }

}
