import { Component, inject } from '@angular/core';
import { ThemeButtonComponent } from '../theme-button-component/theme-button-component';
import { RouterLink, Router, RouterLinkActive } from "@angular/router";
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-navbar-component',
  imports: [
    ThemeButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
