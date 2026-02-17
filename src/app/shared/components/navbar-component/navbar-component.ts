import { Component } from '@angular/core';
import {ThemeButtonComponent} from '../theme-button-component/theme-button-component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  imports: [
    ThemeButtonComponent,
    RouterLink
],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

}
