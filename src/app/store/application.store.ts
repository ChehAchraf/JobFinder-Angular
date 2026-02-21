import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ApplicationService } from '../core/service/application-service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Application } from '../core/model/application.model';
import { HttpErrorResponse } from '@angular/common/http';

type AppState = {
  applicationsList: Application[];
  isLoading: boolean;
  error: string | null;
};

const initialState: AppState = {
  applicationsList: [],
  isLoading: false,
  error: null,
};

export const ApplicationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, appService = inject(ApplicationService)) => ({
    
    loadUserApplications: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((userId) => 
          appService.getUserApplications(userId).pipe(
            tapResponse({
              next: (data) => patchState(store, { applicationsList: data, isLoading: false }),
              error: (err: HttpErrorResponse) => patchState(store, { error: err.message, isLoading: false })
            })
          )
        )
      )
    ),

    addApplication: rxMethod<Application>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((app) => 
          appService.addApplication(app).pipe(
            tapResponse({
              next: (newApp) => patchState(store, (state) => ({ 
                applicationsList: [...state.applicationsList, newApp], 
                isLoading: false 
              })),
              error: (err: HttpErrorResponse) => patchState(store, { error: err.message, isLoading: false })
            })
          )
        )
      )
    ),

    updateApplication: rxMethod<{ id: string; changes: Partial<Application> }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, changes }) => 
          appService.updateApplication(id, changes).pipe(
            tapResponse({
              next: (updatedApp) => patchState(store, (state) => ({
                applicationsList: state.applicationsList.map(app => 
                  app.id === id ? updatedApp : app
                ),
                isLoading: false
              })),
              error: (err: HttpErrorResponse) => patchState(store, { error: err.message, isLoading: false })
            })
          )
        )
      )
    ),

    deleteApplication: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((id) => 
          appService.deleteApplication(id).pipe(
            tapResponse({
              next: () => patchState(store, (state) => ({
                applicationsList: state.applicationsList.filter(app => app.id !== id),
                isLoading: false
              })),
              error: (err: HttpErrorResponse) => patchState(store, { error: err.message, isLoading: false })
            })
          )
        )
      )
    )

  }))
);