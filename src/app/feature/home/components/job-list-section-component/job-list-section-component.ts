import { Component } from '@angular/core';
import {RotatingTextComponent} from '../../../../shared/components/rotating-text-component/rotating-text-component';
import {SearchJobComponent} from '../../../../shared/components/search-job-component/search-job-component';

@Component({
  selector: 'app-job-list-section-component',
  imports: [
    RotatingTextComponent,
    SearchJobComponent
  ],
  templateUrl: './job-list-section-component.html',
  styleUrl: './job-list-section-component.css',
})
export class JobListSectionComponent {

}
