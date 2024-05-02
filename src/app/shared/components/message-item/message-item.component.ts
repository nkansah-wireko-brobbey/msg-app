import { Component, Input } from '@angular/core';
import { IMessage } from '../../../core/models/common.model';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { NameInitialsPipe } from '../../pipes/name-initials.pipe';
import { Router } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';
import { DeleteMessage } from '../../../store/MessageState';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DateAgoPipe, NameInitialsPipe],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {



  @Input() data!: IMessage;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private store: Store
  ){
  }

  openMessageDetails(){
    this.modalService.setModalData(this.data);
    this.modalService.displayModal();
    console.log(this.data)

  }

  openMessage(){
    this.router.navigate(['/edit',this.data._id])
  }

  deleteMessage($event: Event,messageId: string){
    $event.stopPropagation()

    this.store.dispatch(new DeleteMessage(messageId));
    console.log("clicked")

  }

}
