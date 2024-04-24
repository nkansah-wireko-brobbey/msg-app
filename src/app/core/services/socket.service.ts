import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, tap } from 'rxjs';
import { IMessage } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  public saveUserIdWithSocket(userId: string): void {
    // Send message to the server
    this.socket.emit('save_userId', userId);
    console.log("Connect emmited")
  }

  public socketInit(): Observable<any> {
    // Send message to the server
    return this.socket.fromEvent('connected').pipe(
      tap((res) => {
        console.log("Received server socket: ", res);
      })
    );
  }

  public newMesages():Observable<IMessage> {
        // List messages from the server

    return this.socket.fromEvent('new_message');
  }
}
