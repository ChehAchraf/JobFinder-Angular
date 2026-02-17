import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobResponse} from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private readonly http = inject(HttpClient)
  private readonly apiUrl : string = environment.apiUrl

  getJobs(page : number = 1 , category? : string , location? : string): Observable<JobResponse>{
    let params = new HttpParams().set('page', page.toString())
    if(category){
      params = params.set('category', category)
    }
    if(location){
      params = params.set('location', location)
    }
    return this.http.get<JobResponse>(`${this.apiUrl}?page=${page}`,{params})
  }


}
