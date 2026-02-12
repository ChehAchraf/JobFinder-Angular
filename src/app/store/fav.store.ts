import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { FavoriteService } from "../core/service/favorite-service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { favoriteRequest, favoriteResponse } from "../core/model/favorite.model";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";


type FavState = {
    fav : any | null,
    isLoading : boolean,
    error : null | string | undefined
}

const initialState : FavState = {
    fav : null,
    isLoading : false,
    error : null
}


export const FavStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),

    // n3yt 3la lmethods 
    withMethods((store, favoriteService = inject(FavoriteService))=>({
        getAllFavorite : rxMethod<favoriteResponse>(
            pipe(
                tap((data)=>
                    patchState(store, {isLoading:true, error : null})
                ),
                switchMap((data)=>{
                    return favoriteService.getAllFavorite().pipe(
                        tapResponse({
                            next : (response)=>{
                                console.log(response)
                                patchState(store, {
                                    isLoading:false,
                                    fav:response
                                })
                            },
                            error : (err : HttpErrorResponse)=>{
                                console.log(err)
                                patchState(store,{
                                    isLoading: false,
                                    error : err.message
                                })
                            }
                        })
                    )
                })
            )
        )
    }))
)