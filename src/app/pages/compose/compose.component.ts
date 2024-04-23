import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { Select, Store } from '@ngxs/store';
import { GetAllUsers, GetLoggedInUser, UserState } from '../../store/UserState';
import { Observable,map, of } from 'rxjs';
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

  @ViewChild('suggestionsList', { static: true }) suggestionsList!: ElementRef;

  senderId!: string;


  receipient: IUser = {
    email: '',
    name: '',
    _id: '',
  };

  @Select(UserState.selectUsers) users$!: Observable<IUser[]>;

  @Select(UserState.selectUser) loggedInUser$!: Observable<IUser>;

  filteredUsers$!: Observable<IUser[]> ;

  searchFormGroup!: FormGroup ;

  showSuggestions: boolean = false;


  constructor(
    private store: Store,
    private fb: FormBuilder,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {


    this.store.dispatch(new GetAllUsers())
    this.store.dispatch(new GetLoggedInUser())

    this.users$.subscribe({
      next:(value)=>{
        console.log(value)
      }
    })

    this.loggedInUser$.subscribe({
      next:(value)=>{
        console.log(value)
        if(value){
        this.senderId = value._id;
        }
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
      this.searchFormGroup.patchValue({
        to: user.email
      })
      this.hideSuggestionsList()

  }

  searchUsers($event: any){

    console.log($event.target.value)

    this.showSuggestionsList()

      this.filteredUsers$ = this.users$.pipe(
        map((user)=>{
          return user.filter((user)=> user.name.toLowerCase().includes($event.target.value.toLowerCase()))
        })
      )

  }

  hideSuggestionsList(){
    this.showSuggestions = false;
  }

  showSuggestionsList(){
    this.showSuggestions = true;
  }

  onSubmit(){
    if(this.searchFormGroup.valid){
      let messageData: any = this.searchFormGroup.value;

      messageData.to = this.receipient._id;
      messageData.sender = this.senderId;
        this.messageService
          .sendMessage(messageData)
          .subscribe({
            next: (res)=>{
              console.log(res)
              this.resetForm();
            }
          })
        
    }else{
      this.searchFormGroup.markAllAsTouched();
    }
  }

  resetForm(){
    this.searchFormGroup.reset();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = this.suggestionsList.nativeElement.contains(target);
    if (!isClickInside) {
      this.hideSuggestionsList();
    }
  }
  

}
