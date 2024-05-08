import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap,throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)

  return next(req).pipe(
    catchError((error)=>{

      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        console.log(`Error Code: ${error.status}\nMessage: ${error.message}`)

        // errorMessage = `Message: ${error.error.error.message}` ;
        errorMessage = (error.error.error && error.error.error.message)?error.error.error.message : error.statusText;
        console.log(error)
      }
      toastrService.error('Error', errorMessage);
      return throwError(()=>error);

    })
  )
};
