import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/service/auth-service';
import {AuthStore} from '../../../store/auth.store';

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

  private readonly fb = inject(NonNullableFormBuilder)
  private readonly authService = inject(AuthService)
  private readonly store = inject(AuthStore)

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

  submit() : void {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.getRawValue();

    this.store.register(data);

  }


}
