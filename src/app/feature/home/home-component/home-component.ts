import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../../../shared/components/navbar-component/navbar-component';
import {HeroSectionComponent} from '../components/hero-section-component/hero-section-component';
import {JobListSectionComponent} from '../components/job-list-section-component/job-list-section-component';
import {JobCardComponent} from '../../../shared/components/job-card-component/job-card-component';
import {JobStore} from '../../../store/job.store';

@Component({
  selector: 'app-home-component',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    JobListSectionComponent,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
    readonly store = inject(JobStore)

    constructor() {
      this.store.loadJobs()
    }
}
