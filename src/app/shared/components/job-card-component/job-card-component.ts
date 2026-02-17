import {Component, inject, input, output} from '@angular/core';
import {Job} from '../../../core/model/job.model';
import {DatePipe} from '@angular/common';
import {TruncatePipe} from '../../pipes/truncate-pipe';
import { FavStore } from '../../../store/fav.store';

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

  onAddFavorite = output<Job>()

  addToFav(){
    this.onAddFavorite.emit(this.job())
  }
  
}
