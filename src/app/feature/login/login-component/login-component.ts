import { Component, OnInit } from '@angular/core';
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

  successMessage : string | null = null;

  protected readonly RouterLink = RouterLink;

  ngOnInit(): void {
      this.successMessage = history.state.successMsg || null;
  }
}
