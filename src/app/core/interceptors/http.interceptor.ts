import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  if(tokenService.getToken()){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${tokenService.getToken()}`
      }
    })
  }

  return next(req).pipe(
    // retry(2),
    catchError((e: HttpErrorResponse)=>{
      if(e.status == 401){
        tokenService.removeToken()
        router.navigate([''])
      }
      console.log(e)


        const error = (e.error.message)?e.error?.message : e.statusText;

      
      return throwError(()=> error)
    })
  )
};
