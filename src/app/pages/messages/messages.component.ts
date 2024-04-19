import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { MessageItemComponent } from '../../shared/components/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,SidebarComponent, MessageItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{

 constructor(
  private messageService: MessageService
 ){

 }

 ngOnInit(): void {
     this.getAllMessages()
 }

 getAllMessages(){
    this.messageService.getAllMessages()
    .subscribe({
      next(res){
        console.log(res)
      },
      error(error){
        console.log(error)
      }
    })
  }


}
