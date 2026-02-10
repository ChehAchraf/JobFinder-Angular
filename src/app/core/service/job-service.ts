import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobResponse} from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private readonly http = inject(HttpClient)
  private readonly apiUrl : string = environment.apiUrl

  getJobs(page : number): Observable<JobResponse>{
    return this.http.get<JobResponse>(`${this.apiUrl}?page=${page}`)
  }


}
