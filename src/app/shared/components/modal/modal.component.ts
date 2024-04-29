import { Component, Input } from '@angular/core';
import { IMessage } from '../../../core/models/common.model';
import { ModalService } from '../../../core/services/modal.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  modalObservable!: Observable<IMessage>;
  showModalObservable!: Observable<boolean>;

  modalData!: IMessage;

  showModal = false;



  constructor(
    private modalService: ModalService
  ) {}

  ngOnInit() {

    this.modalObservable = this.modalService.getModalData();

    this.modalObservable.subscribe({
      next: (value) => {
        this.modalData = value;
        console.log('modalData', value)
      }
    })

    this.showModalObservable = this.modalService.getShowModal();

    this.showModalObservable.subscribe({
      next: (value) => {
        this.showModal = value;
        console.log('showModal', value)
      }
    })
   
  }

  closeModal(){
    this.modalService.hideModal();
    this.modalService.clearModalData();
  }

}
