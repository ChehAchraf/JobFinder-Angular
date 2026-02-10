import {Component, inject, OnInit} from '@angular/core';
import {RotatingTextComponent} from '../../../../shared/components/rotating-text-component/rotating-text-component';
import {SearchJobComponent} from '../../../../shared/components/search-job-component/search-job-component';
import {JobStore} from '../../../../store/job.store';
import {JobCardComponent} from '../../../../shared/components/job-card-component/job-card-component';

@Component({
  selector: 'app-job-list-section-component',
  imports: [
    RotatingTextComponent,
    SearchJobComponent,
    JobCardComponent
  ],
  templateUrl: './job-list-section-component.html',
  styleUrl: './job-list-section-component.css',
})
export class JobListSectionComponent implements OnInit {

  readonly store = inject(JobStore);

  ngOnInit() {
    this.store.loadJobs();
  }
}
