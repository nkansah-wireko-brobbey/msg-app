import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { Select, Store } from '@ngxs/store';
import { GetAllUsers, GetLoggedInUser, UserState } from '../../store/UserState';
import { Observable,Subscription,map, of } from 'rxjs';
import { IUser } from '../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../core/services/message.service';
import { IMessage } from '../../core/models/common.model';
import { ActivatedRoute } from '@angular/router';
import { GetMessage, MessageState, ResetMessage } from '../../store/MessageState';

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

  private usersSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;
  private editableMessageSubscription: Subscription | undefined;

  @Select(UserState.selectUsers) users$!: Observable<IUser[]>;

  @Select(UserState.selectUser) loggedInUser$!: Observable<IUser>;

  @Select(MessageState.selectMessage) editableMessage$!: Observable<IMessage>;

  filteredUsers$!: Observable<IUser[]> ;

  searchFormGroup!: FormGroup ;

  showSuggestions: boolean = false;

  paramMap: string | null = '';


  constructor(
    private store: Store,
    private fb: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {

    this.paramMap = this.activatedRoute.snapshot.paramMap.get('id');


    console.log("This is the parameter: ",this.paramMap)



    this.store.dispatch(new GetAllUsers())
    this.store.dispatch(new GetLoggedInUser())

   this.usersSubscription = this.users$.subscribe({
      next:(value)=>{
        console.log(value)
      }
    })

    this.loggedInUserSubscription = this.loggedInUser$.subscribe({
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


    if(this.paramMap){
      this.store.dispatch(new GetMessage(this.paramMap))

    }
   this.editableMessageSubscription = this.editableMessage$
    .subscribe({
      next:(value)=>{
        console.log("Editable message: ",value)
        if(value){
          this.searchFormGroup.patchValue({
            to: value.sender.email,
            subject: value.subject,
            body: value.body
          })
        }
    }})

  }

  ngOnDestroy(): void {
    
    this.usersSubscription?.unsubscribe();
    this.loggedInUserSubscription?.unsubscribe();
    this.editableMessageSubscription?.unsubscribe();
    this.resetForm();
    this.store.dispatch(new ResetMessage())
    
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

      messageData.to = this.receipient._id || this.searchFormGroup.get('to')?.value;
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
