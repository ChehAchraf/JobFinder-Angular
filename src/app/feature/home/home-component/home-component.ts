import { Component } from '@angular/core';
import {NavbarComponent} from '../../../shared/components/navbar-component/navbar-component';
import {HeroSectionComponent} from '../components/hero-section-component/hero-section-component';

@Component({
  selector: 'app-home-component',
  imports: [
    NavbarComponent,
    HeroSectionComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

}
