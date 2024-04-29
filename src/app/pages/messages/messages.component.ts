import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { MessageItemComponent } from '../../shared/components/message-item/message-item.component';
import { Select, Store } from '@ngxs/store';
import { GetAllMessages, GetNewMessage, MessageState } from '../../store/MessageState';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { IMessage } from '../../core/models/common.model';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../core/services/filter.service';

import { UrlService } from '../../core/services/url.service';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,SidebarComponent, MessageItemComponent,CommonModule,RouterModule, ModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy{

  messageSubscription: Subscription | undefined;
  @Select(MessageState.selectMessages) message$!: Observable<IMessage[]>;


  messageDataSubsciption: Subscription | undefined;
  messageData$!: Observable<IMessage[]>;

 constructor(
  private store: Store,
  private filterService: FilterService,
  private urlService: UrlService

 ){

 }

 ngOnInit(): void {

    this.store.dispatch([new GetAllMessages(), new GetNewMessage()])
    console.log("Message Here")
   this.messageSubscription = this.message$.subscribe({
      next:(value)=>{
        if(value.length){
          this.messageData$ = this.message$
        }
        console.log('in here',value)
      }
    })

    this.urlService.getURL().pipe(
      switchMap(filterType => {
        return this.filterService.filterData(this.message$, filterType);
      })
    ).subscribe({
      next: filteredMessages => {
        this.messageData$ = of(filteredMessages);
      },
      error: err => {
        console.error('Error filtering messages:', err);
      }
    });
 }


 ngOnDestroy(): void {

  this.messageSubscription?.unsubscribe();
  this.messageDataSubsciption?.unsubscribe();

  console.log("Destroy Run")
  
 }




}
