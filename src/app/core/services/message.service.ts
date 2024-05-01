import { Injectable } from '@angular/core';
import { apiEndpoint } from '../constants/constants';
import { Observable, tap } from 'rxjs';
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

  sendMessage(messageData: IMessage):Observable<IApiResponse<IMessage>>{
    console.log("Message Class",messageData)
    return this.http.post<IApiResponse<IMessage>>(`${apiEndpoint.MessageEndpoint}`,messageData)
    .pipe(
      tap((res)=>{
          console.log(res)
      })
    )
  }

  getMessage(id: string):Observable<IApiResponse<IMessage>>{
    return this.http.get<IApiResponse<IMessage>>(`${apiEndpoint.MessageEndpoint}/${id}`)
  }

  deletMessage(id: string):Observable<IApiResponse<IMessage>>{
    return this.http.delete<IApiResponse<IMessage>>(`${apiEndpoint.MessageEndpoint}/${id}`)
  }

}
