import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {AuthService} from '../core/service/auth-service';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {Router} from '@angular/router';

type UserState = {
  user : any | null,
  isAuthenticated : boolean,
  isLoading : boolean,
  error : string | null,
  }

const initialState : UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}


export const AuthStore = signalStore(
  {providedIn : 'root'},
  withState(initialState),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) =>({
    register : rxMethod<{username: string, email: string, password: string}>(
      pipe(
        tap( (data) => patchState(store, {isLoading: true, error : null}) ),
        switchMap((credentials)=>{
          return authService.userRegister(credentials).pipe(
            tapResponse({
              next : (response)=>{
                patchState(store , {
                  isLoading: false,
                  isAuthenticated : true,
                  user: response
                })
                router.navigate(['/login'],{
                  state: { successMsg : "Registration has done, you can now log in 🎉" }
                })
              },
              error : (err)=>{
                console.log("error")
                patchState(store, {
                  isLoading : false,
                  error : 'error during regestration'
                })
              }
            })
          )
        })
      )
    )
  }) )
)
