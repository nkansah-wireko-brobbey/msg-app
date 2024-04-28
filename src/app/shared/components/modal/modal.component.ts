import { Component, Input } from '@angular/core';
import { IMessage } from '../../../core/models/common.model';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() data!: IMessage;
  constructor(
    private modalService: ModalService
  ) {}
}
