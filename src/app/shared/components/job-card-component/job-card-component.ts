import {Component, input} from '@angular/core';
import {Job} from '../../../core/model/job.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-card-component',
  imports: [
    DatePipe
  ],
  templateUrl: './job-card-component.html',
  styleUrl: './job-card-component.css',
})
export class JobCardComponent {
  job = input.required<Job>();
}
