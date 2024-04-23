import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { Select, Store } from '@ngxs/store';
import { GetAllUsers, UserState } from '../../store/UserState';
import { Observable } from 'rxjs';
import { IUser } from '../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../core/services/message.service';
import { IMessage } from '../../core/models/common.model';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent,SidebarComponent,CommonModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss'
})
export class ComposeComponent implements OnInit, OnDestroy{

  receipient: IUser = {
    email: '',
    name: '',
    _id: ''
  };

  @Select(UserState.selectUsers) users$!: Observable<IUser[]>;

  searchFormGroup!: FormGroup ;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {


    this.store.dispatch(new GetAllUsers())

    this.users$.subscribe({
      next:(value)=>{
        console.log(value)
      }
    })

    this.searchFormGroup = this.fb.group({
      to: new FormControl('',[Validators.required]),
      subject: new FormControl('',[Validators.required]),
      body:new FormControl('',[Validators.required])
    })
  }

  ngOnDestroy(): void {
    
    
  }

 setReceipient(user: IUser){
      this.receipient = user;
      console.log(this.receipient)
  }

  onSearch(userStr : string){

  }

  onSubmit(){
    if(this.searchFormGroup.valid){
      let messageData: any = this.searchFormGroup.value;
      messageData.to = this.receipient._id;
        this.messageService.sendMessage(messageData);
        
      console.log(this.searchFormGroup.value)
    }else{
      this.searchFormGroup.markAllAsTouched();
      console.log(this.searchFormGroup)
    }
  }

}
