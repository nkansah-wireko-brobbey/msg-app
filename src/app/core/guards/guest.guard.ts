import { CanActivateFn, Router } from '@angular/router';
import {  inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const guestGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router)

  tokenService.isAuthenticated.subscribe(
    {
      next(value){
        if(value){
            router.navigate(['messages'])
        }
      }
    }
  )


  return true;
};
