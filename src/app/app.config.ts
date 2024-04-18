import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { httpInterceptor } from './core/interceptors/http.interceptor';


import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(NgxsModule.forRoot()), provideAnimations(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
     provideHttpClient(withInterceptors([httpInterceptor]))
  ]
};
