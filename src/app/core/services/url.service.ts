import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private location: Location) { }

  getURL(): Observable<string> {

    return new Observable(observer => {
      const urlChangeHandler = () => {
        observer.next(this.location.path().split('/').pop() || '');
      };
      this.location.onUrlChange(urlChangeHandler);

      observer.next(this.location.path().split('/').pop() || '');
    });
  }
}
