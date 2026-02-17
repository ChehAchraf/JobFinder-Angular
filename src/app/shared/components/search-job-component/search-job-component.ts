import { Component, inject } from '@angular/core';
import { JobStore } from '../../../store/job.store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-job-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-job-component.html',
  styleUrl: './search-job-component.css',
})
export class SearchJobComponent {
  readonly store = inject(JobStore);

  searchForm = new FormGroup({
    category: new FormControl(''),
    location: new FormControl('')
  });

  ngOnInit() {
    this.searchForm.valueChanges.subscribe((value) => {
      this.store.searchJobs({
        category: value.category || '',
        location: value.location || ''
      });
    });

    this.store.searchJobs({ category: '', location: '' });
  }
}
