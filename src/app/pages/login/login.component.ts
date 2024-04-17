import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../shared/components/card/card.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  constructor(
    private toastService: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }
  openToast() {
    this.toastService.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required])
      })
  }

  onSubmit(){
      if(this.loginForm.valid){
          console.log(this.loginForm.value)
          this.authService.login(this.loginForm.value)
          .subscribe({
            next(res){
              console.log(res)
            },
            error(error){
              console.log(error)
            }

            
          })
          
      }else{
        this.loginForm.markAllAsTouched();
      }
  }
}
