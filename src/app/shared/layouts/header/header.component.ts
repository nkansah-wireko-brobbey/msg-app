import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ){

  }
logout() {
  this.authService.logout().subscribe({
    next(){
      
    }
  })
}

}
