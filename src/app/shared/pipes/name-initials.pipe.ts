import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials',
  standalone: true
})
export class NameInitialsPipe implements PipeTransform {

  transform(value: string, ...args: any): any {
    const nameArray = value.split(" ",1)

    let initials = value.substring(0,2);
    
    if(nameArray.length > 1)
    initials = nameArray[0].substring(0,1)+nameArray[1].substring(0,1);

    return initials.toUpperCase();
  }

}
