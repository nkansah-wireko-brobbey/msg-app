import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService  = inject(ToastrService)

  return next(req).pipe(
    tap((res: any)=>{
      if(res instanceof HttpResponse && res.status  == 201){

        const message = "Successfully Completed";

        if(res.body?.message){
          toastrService.success(res.body.message)
      }
    }
    })
  )
};
