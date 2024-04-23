import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  public socketID(userId: string): void {
    // Send message to the server
    this.socket.emit('connect', userId);
    console.log("Connect emmited")
  }

  public listMessages() {
        // List messages from the server

    return this.socket.fromEvent('messages');
  }
}
