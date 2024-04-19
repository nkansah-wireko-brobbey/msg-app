import { Injectable } from '@angular/core';
import { apiEndpoint } from '../constants/constants';
import { Observable } from 'rxjs';
import { IApiResponse, IMessage } from '../models/common.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  

  constructor(
    private http: HttpClient
  ) { }

  getAllMessages():Observable<IApiResponse<IMessage[]>>{

    return this.http.get<IApiResponse<IMessage[]>>(apiEndpoint.MessageEndpoint);
  }
}
