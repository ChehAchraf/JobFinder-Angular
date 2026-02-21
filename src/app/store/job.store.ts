import { Job } from '../core/model/job.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { JobService } from '../core/service/job-service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



type JobState = {
  jobs: Job[];
  total: number;
  page: number;
  page_count: number;
  category: string;
  location: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  total: 0,
  page: 1, // Start at page 1
  page_count: 0,
  category: '',
  location: '',
  isLoading: false,
  error: null,
};

export const JobStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, jobService = inject(JobService)) => ({

    loadJobs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          // Use current state for API call
          return jobService.getJobs(store.page(), store.category(), store.location()).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  jobs: response.results,
                  total: response.total, // Assuming API returns total count
                  page_count: response.page_count,
                  isLoading: false
                })
              },
              error: (err: HttpErrorResponse) => {
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
        tap((filters) => patchState(store, {
          isLoading: true,
          error: null,
          category: filters.category,
          location: filters.location,
          page: 1 // Reset to first page on new search
        })),
        switchMap((filters) => {
          return jobService.getJobs(1, filters.category, filters.location).pipe(
            tapResponse({
              next: (response) => patchState(store, {
                jobs: response.results,
                total: response.total,
                page_count: response.page_count,
                isLoading: false
              }),
              error: (err: HttpErrorResponse) => patchState(store, {
                isLoading: false,
                error: err.message
              })
            })
          );
        })
      )
    ),

    updatePage: (page: number) => {
      patchState(store, { page });
      // Trigger load with new page
      // We can't call loadJobs() directly here easily if it's an rxMethod without proper chaining,
      // but cleaner way is to reuse the logic.
      // For simplicity, let's just duplicate the single call or use a shared internal function if possible,
      // but here I'll just call the service directly to update.
      // Actually, better: allow loadJobs to be reactive to state changes if we used a watcher,
      // but standard way: just call the service.

      patchState(store, { isLoading: true });
      jobService.getJobs(page, store.category(), store.location()).subscribe({
        next: (response) => patchState(store, {
          jobs: response.results,
          total: response.total,
          page_count: response.page_count,
          isLoading: false
        }),
        error: (err) => patchState(store, { isLoading: false, error: err.message })
      });
    }

  }))
)

