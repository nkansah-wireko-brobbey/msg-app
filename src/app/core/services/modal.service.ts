import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private modalData: Observable<IMessage> = new Observable();

  constructor() { }

  public getModalData(): Observable<IMessage> {
    return this.modalData;
  }

  public setModalData(data: IMessage): void {
    this.modalData = new Observable(subscriber => {
      subscriber.next(data);
    });
  }

  public getShowModal(): Observable<boolean> {
    return this.showModal;
  }

  public setShowModal(status: boolean): void {
    this.showModal.next(status);
  }

  public clearModalData(): void {
    this.modalData = new Observable();
  }


}
