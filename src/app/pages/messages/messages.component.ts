import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { MessageItemComponent } from '../../shared/components/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';
import { Select, Store } from '@ngxs/store';
import { GetAllMessages, MessageState } from '../../store/MessageState';
import { Observable } from 'rxjs';
import { IMessage } from '../../core/models/common.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,SidebarComponent, MessageItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{

  @Select(MessageState.selectMessages) message$!: Observable<IMessage[]>;

 constructor(
  private messageService: MessageService,
  private store: Store
 ){

 }

 ngOnInit(): void {
    //  this.getAllMessages()
    this.message$.subscribe({
      next:(value)=>{
        if(!value.length){
            this.store.dispatch(new GetAllMessages())
            console.log(value)
        }
      }
    })
 }




}
