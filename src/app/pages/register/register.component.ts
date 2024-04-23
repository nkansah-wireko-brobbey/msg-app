import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    
  ){
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    })
    
  }

  onSubmit(){
    console.log('clicked on submit')
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.authService.register(this.registerForm.value)
        .subscribe({
          next:(res)=>{
              this.toastService.success(res.message || 'User created Successfully')
              console.log(res)
          },
          error:(error)=>{
              console.log(error)
          }
        })
    }else{
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPasswordValidator(formGroup: FormGroup):{[key: string]: boolean}| null{

      const password = formGroup.get('password')?.value
      const confirmPassword = formGroup.get('confirmPassword')?.value

      if(confirmPassword !== password){
        return {mismatch: true}
      }

      return null;
  }

}
