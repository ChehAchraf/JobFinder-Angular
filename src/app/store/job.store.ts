import {Job} from '../core/model/job.model';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {JobService} from '../core/service/job-service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {debounceTime, distinctUntilChanged, pipe, switchMap, tap} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


type JobState = {
  jobs : Job[];
  total: number;
  page: number;
  query: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  total: 0,
  page: 0,
  query: '',
  isLoading: false,
  error: null,
};

export const JobStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods( (store, jobService = inject(JobService)) =>({

    loadJobs : rxMethod<void>(
      pipe(
        tap( ()=> patchState(store, { isLoading : true })  ),
        switchMap(()=>{
          return jobService.getJobs(4).pipe(
            tapResponse({
              next: (response)=>{
                console.log(response)
                patchState(store,{
                  jobs: response.results,
                  isLoading : false
                })
              },
              error: (err:HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: err.message
                });
              },
            })
          )
        })
      )
    ),
    searchJobs: rxMethod<{ category: string; location: string }>(
      pipe(
        debounceTime(500), 
        distinctUntilChanged((prev, curr) => 
          prev.category === curr.category && prev.location === curr.location
        ),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((filters) => {
          return jobService.getJobs(1, filters.category, filters.location).pipe(
            tapResponse({
              next: (response) => patchState(store, { 
                jobs: response.results, 
                isLoading: false 
              }),
              error: (err : HttpErrorResponse) => patchState(store, { 
                isLoading: false, 
                error: err.message 
              })
            })
          );
        })
      )
    )
    

  }))
)
