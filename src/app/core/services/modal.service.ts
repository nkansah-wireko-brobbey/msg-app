import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IMessage } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private modalData: BehaviorSubject<IMessage> = new BehaviorSubject<IMessage>({} as IMessage);

  constructor() { }

  public getModalData(): Observable<IMessage> {
    return this.modalData;
  }

  public setModalData(data: IMessage): void {
    this.modalData.next(data);
  }

  public getShowModal(): Observable<boolean> {
    return this.showModal;
  }

  private setShowModal(status: boolean): void {
    this.showModal.next(status);
  }

  public displayModal(): void {
    this.setShowModal(true);
  }

  public hideModal(): void {
    this.setShowModal(false);
  }

  public clearModalData(): void {
    this.modalData.next({} as IMessage);
  }


}
