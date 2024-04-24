import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './core/services/socket.service';
import { Select, Store } from '@ngxs/store';
import { GetLoggedInUser, UserState } from './store/UserState';
import { Observable } from 'rxjs';
import { IUser } from './core/models/auth.model';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'msg-app';

  @Select(UserState.selectUser) user$!: Observable<IUser>;

  constructor(
    private socketService: SocketService,
    private store: Store,
    private tokenService: TokenService
  ) {

    this.tokenService.isAuthenticated.subscribe({
      next: (value) => {
        if(value){
          this.store.dispatch(new GetLoggedInUser())
        }
      }
    });
    
    this.user$.subscribe({
      next: (value) => {
        if(value){
          this.socketService.saveUserIdWithSocket(value._id)
        }
      }
    });

    this.socketService.socketInit().subscribe(
      {
        next: (res) => {
          console.log("Socket Id: ", res);
        }
      }
    );
  }
}
