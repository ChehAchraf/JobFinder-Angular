import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [
    RouterLink
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder)
  successMessage : string | null = null;

  protected readonly RouterLink = RouterLink;

  ngOnInit(): void {
      this.successMessage = history.state.successMsg || null;
  }

  loginForm = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',[Validators.required, Validators.min(6)]]
  })

  get email(){
    return this.loginForm.controls.email
  }

  get password(){
    return this.loginForm.controls.password
  }
}
