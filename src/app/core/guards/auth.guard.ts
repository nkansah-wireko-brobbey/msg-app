import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router)

  tokenService.isAuthenticated.subscribe({
    next(val){
      if(!val){
        router.navigate([''])
      }
    }
  })

  return true;
};
