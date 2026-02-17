import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { FavoriteService } from "../core/service/favorite-service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { concatMap, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { favoriteRequest } from "../core/model/favorite.model";


type FavState = {
    favoritesList: any[],
    fav: any | null,
    isLoading: boolean,
    error: null | string | undefined
}

const initialState: FavState = {
    favoritesList: [],
    fav: null,
    isLoading: false,
    error: null
}


export const FavStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    // n3yt 3la lmethods 
    withMethods((store, favoriteService = inject(FavoriteService)) => ({
        getAllFavorite: rxMethod<void>(
            pipe(
                tap((data) =>
                    patchState(store, { isLoading: true, error: null })
                ),
                switchMap(() => {
                    return favoriteService.getAllFavorite().pipe(
                        tapResponse({
                            next: (response) => {
                                console.log(response)
                                patchState(store, {
                                    isLoading: false,
                                    fav: response
                                })
                            },
                            error: (err: HttpErrorResponse) => {
                                console.log(err)
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
        addJobToFavorite: rxMethod<favoriteRequest>(
            pipe(
                tap(
                    () => patchState(store, { isLoading: true, error: null })
                ),
                concatMap(
                    (data) => {
                        return favoriteService.addToFavorite(data).pipe(
                            tapResponse({
                                next: (newFav) => {
                                    patchState(
                                        store,
                                        (state) => ({
                                            favoritesList: [...state.favoritesList, newFav],
                                            isLoading: false
                                        })
                                    )
                                },
                                error: (err: HttpErrorResponse) => {
                                    patchState(
                                        store,
                                        {
                                            error: err.message
                                        }
                                    )
                                }
                            })
                        )
                    }
                )
            )
        ),
        deleteFromFavorite: rxMethod<string>(
            pipe(
                tap(
                    () => patchState(store, { isLoading: true, error: null })
                ),
                concatMap(
                    (id) => {
                        return favoriteService.deleteFromFavorite(id).pipe(
                            tapResponse({
                                next: (response) => {
                                    patchState(
                                        store,
                                        (state) => ({
                                            fav: Array.isArray(state.fav) ? state.fav.filter((item: any) => item.id !== id) : state.fav,
                                            favoritesList: state.favoritesList.filter(item => item.id !== id),
                                            isLoading: false
                                        })
                                    )
                                },
                                error: (err: HttpErrorResponse) => {
                                    console.log(err.message)
                                    patchState(store, {
                                        error: err.message,
                                        isLoading: false
                                    })
                                }
                            })
                        )
                    }
                )
            )
        )
    }))
)