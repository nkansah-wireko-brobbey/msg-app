import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMessage } from '../models/common.model';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../store/UserState';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  @Select(UserState.selectUser) user$!: Observable<IUser>;

  userId!: string;

  constructor(
    private store: Store
  ) { 
    this.user$.subscribe({
      next: (value) => {
        if(value)
        this.userId = value._id
          console.log("User Id: ", value);
      }
    });
  }

  public filterData(data: Observable<IMessage[]>, filter: string) {

    if (!this.filterCriteria(filter)) {
      return data;
    }
    return this.filterCriteria(filter) === "trash" ? this.filterInTrash(data) : this.filterCriteria(filter) ==="sent"? this.filterInSent(data): this.filterOutTrash(data);
  }

  private filterCriteria(filter: string) : false | "trash" | "sent" | "all"{

    return filter === "trash" ? "trash" : filter === "sent" ? "sent" : filter === "all"?"all":false;

  }

  private filterInTrash(data: Observable<IMessage[]>) {
    return data.pipe(
      map((res) => {
        return res.filter((item) => {
          return item.status == 3;
        });
      }
    ))
  }

  private filterInSent(data: Observable<IMessage[]>) {
    return data.pipe(
      map((res) => {
        return res.filter((item) => {
          return item.sender._id === this.userId && item.status !== 3;
        });
      }
    ))
  }

  private filterOutTrash(data: Observable<IMessage[]>){
    return data.pipe(
      map((res)=>{
        return res.filter((item)=>{
          return item.status !== 3
        })
      })
    )
  }
}
