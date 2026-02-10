import {Component, input} from '@angular/core';
import {Job} from '../../../core/model/job.model';
import {DatePipe} from '@angular/common';
import {TruncatePipe} from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-job-card-component',
  imports: [
    DatePipe,
    TruncatePipe
  ],
  templateUrl: './job-card-component.html',
  styleUrl: './job-card-component.css',
})
export class JobCardComponent {
  job = input.required<Job>();
}
