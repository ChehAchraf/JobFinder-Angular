import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-login-component',
  imports: [
    RouterLink,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder)
  authStore = inject(AuthStore)
  
  successMessage : string | null = null;

  protected readonly RouterLink = RouterLink;

  ngOnInit(): void {
      this.successMessage = history.state.successMsg || null;
  }

  loginForm = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',[Validators.required, Validators.minLength(6)]]
  })

  get email(){
    return this.loginForm.controls.email
  }

  get password(){
    return this.loginForm.controls.password
  }

  // submit 

  submit() : void {
    const data = this.loginForm.getRawValue()

    this.authStore.login(data)
  }

}
