import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { favoriteResponse } from '../model/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  
  private http = inject(HttpClient)
  private jsonApiUrl = environment.jsonServer

  getAllFavorite() : Observable<favoriteResponse>{
    return this.http.get<favoriteResponse>(`${this.jsonApiUrl}/fav`)
  }

  

}
