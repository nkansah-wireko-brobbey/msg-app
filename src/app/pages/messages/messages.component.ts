import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { MessageItemComponent } from '../../shared/components/message-item/message-item.component';
import { Select, Store } from '@ngxs/store';
import { GetAllMessages, GetNewMessage, MessageState } from '../../store/MessageState';
import { Observable } from 'rxjs';
import { IMessage } from '../../core/models/common.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,SidebarComponent, MessageItemComponent,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy{

  @Select(MessageState.selectMessages) message$!: Observable<IMessage[]>;

 constructor(
  private store: Store
 ){

 }

 ngOnInit(): void {
    //  this.getAllMessages()


    this.store.dispatch([new GetAllMessages(), new GetNewMessage()])
    console.log("Message Here")
    this.message$.subscribe({
      next:(value)=>{
        if(value.length){
            console.log(value)
        }
        console.log('in here',value)
      }
    })
    
 }
 ngOnDestroy(): void {

  console.log("Destroy Run")
  
 }




}
