import { Injectable } from '@angular/core';
import { apiEndpoint } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/common.model';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

 getAllUsers() : Observable<IApiResponse<IUser[]>>{

   return this.http.get<IApiResponse<IUser[]>>(`${apiEndpoint.UserEndpoint}`);

  }
}
