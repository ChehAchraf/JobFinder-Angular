import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-component',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  standalone : true,
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  private readonly fb = inject(FormBuilder)

  registerForm = this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4)]],
    email : ['', [Validators.email, Validators.required]],
    password : ['' , [Validators.required, Validators.minLength(6)]]
  })

  get username(){
    return this.registerForm.controls.username;
  }

  get email(){
    return this.registerForm.controls.email;
  }

  get password(){
    return this.registerForm.controls.password;
  }




}
