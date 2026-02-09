import { Component } from '@angular/core';
import {NavbarComponent} from '../../../shared/components/navbar-component/navbar-component';
import {HeroSectionComponent} from '../components/hero-section-component/hero-section-component';
import {JobListSectionComponent} from '../components/job-list-section-component/job-list-section-component';
import {JobCardComponent} from '../../../shared/components/job-card-component/job-card-component';

@Component({
  selector: 'app-home-component',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    JobListSectionComponent,
    JobCardComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

}
