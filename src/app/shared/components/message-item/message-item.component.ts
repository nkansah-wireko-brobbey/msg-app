import { Component, Input } from '@angular/core';
import { IMessage } from '../../../core/models/common.model';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { NameInitialsPipe } from '../../pipes/name-initials.pipe';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DateAgoPipe, NameInitialsPipe],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {

  @Input() data!: IMessage;

  constructor(){
    console.log(this.data)
  }

}
