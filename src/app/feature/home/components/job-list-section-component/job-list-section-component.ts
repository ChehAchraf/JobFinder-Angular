import {Component, inject, OnInit} from '@angular/core';
import {RotatingTextComponent} from '../../../../shared/components/rotating-text-component/rotating-text-component';
import {SearchJobComponent} from '../../../../shared/components/search-job-component/search-job-component';
import {JobStore} from '../../../../store/job.store';
import {JobCardComponent} from '../../../../shared/components/job-card-component/job-card-component';
import { Job } from '../../../../core/model/job.model';
import { AuthStore } from '../../../../store/auth.store';
import { FavStore } from '../../../../store/fav.store';

@Component({
  selector: 'app-job-list-section-component',
  imports: [
    JobCardComponent,
    SearchJobComponent
  ],
  templateUrl: './job-list-section-component.html',
  styleUrl: './job-list-section-component.css',
})
export class JobListSectionComponent implements OnInit {

  readonly store = inject(JobStore);
  readonly authStore = inject(AuthStore);
  readonly favStore = inject(FavStore);

  ngOnInit() {
    this.store.loadJobs();
  }

  handleFavorite(job : Job){
    const user = this.authStore.user();
    if (!user) {
      alert('wa dir login ashbi');
      return;
    }
    const favoriteData = {
      userId: user.id,
      jobId: job.id.toString(),       
      jobTitle: job.name,
      companyName: job.company.name,
      location: job.locations[0]?.name,
      date: job.publication_date
    };

    this.favStore.addJobToFavorite(favoriteData);
  }

}
