import { Component } from '@angular/core';
import {ThemeButtonComponent} from '../theme-button-component/theme-button-component';

@Component({
  selector: 'app-navbar-component',
  imports: [
    ThemeButtonComponent
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

}
