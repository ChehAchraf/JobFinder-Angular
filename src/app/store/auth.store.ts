import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '../core/service/auth-service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



type UserState = {
  user: any | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: null | string | undefined,
}

function loadUserFromStorage(): { user: any | null; isAuthenticated: boolean } {
  const stored = localStorage.getItem('user_session');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      return { user, isAuthenticated: true };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
}

const initialState: UserState = {
  ...loadUserFromStorage(),
  isLoading: false,
  error: undefined,
}


export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    register: rxMethod<{ nom: string, prenom: string, email: string, password: string }>(
      pipe(
        tap((data) => patchState(store, { isLoading: true, error: null })),
        switchMap((credentials) => {
          return authService.userRegister(credentials).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  isLoading: false,
                  isAuthenticated: true,
                  user: response
                })
                router.navigate(['/login'], {
                  state: { successMsg: "Registration has done, you can now log in 🎉" }
                })
              },
              error: (err) => {
                console.log("error")
                patchState(store, {
                  isLoading: false,
                  error: 'error during regestration'
                })
              }
            })
          )
        })
      )
    ),
    login: rxMethod<{ email: string | null, password: string | null }>(
      // start pipe
      pipe(
        tap((data) => patchState(store, { isLoading: true, error: null })),
        switchMap((credentials) => {
          return authService.userLogin(credentials).pipe(
            tapResponse({
              next: (users) => {
                if (users.length > 0) {
                  const user = users[0];

                  localStorage.setItem('user_session', JSON.stringify(user));

                  patchState(store, {
                    user: user,
                    isAuthenticated: true,
                    isLoading: false
                  });
                  router.navigate(['/']);
                } else {
                  patchState(store, {
                    isLoading: false,
                    error: 'Email ou mot de passe incorrect'
                  });
                }

              },
              error: (err: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: err.message
                })
              }
            })
          )
        })
      )

    ),
    logout: () => {
      localStorage.removeItem('user_session');
      patchState(store, {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    },
    updateProfile: rxMethod<Partial<any> & { id: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((payload) => {
          const { id, ...data } = payload;
          return authService.updateProfile(id, data).pipe(
            tapResponse({
              next: (updatedUser) => {
                localStorage.setItem('user_session', JSON.stringify(updatedUser));
                patchState(store, {
                  user: updatedUser,
                  isLoading: false
                });
              },
              error: (err: HttpErrorResponse) => {
                patchState(store, { error: err.message, isLoading: false });
              }
            })
          );
        })
      )
    ),
    deleteAccount: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((id) => {
          return authService.deleteAccount(id).pipe(
            tapResponse({
              next: () => {
                localStorage.removeItem('user_session');
                patchState(store, {
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: null
                });
                router.navigate(['/login']);
              },
              error: (err: HttpErrorResponse) => {
                patchState(store, { error: err.message, isLoading: false });
              }
            })
          );
        })
      )
    )
  }))
)
