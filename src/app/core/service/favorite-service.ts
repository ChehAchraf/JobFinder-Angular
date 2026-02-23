import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { favoriteRequest, favoriteResponse } from '../model/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private http = inject(HttpClient)
  private jsonApiUrl = environment.jsonServer

  getAllFavorite(userId: string): Observable<favoriteResponse[]> {
    return this.http.get<favoriteResponse[]>(`${this.jsonApiUrl}/fav?userId=${userId}`);
  }

  addToFavorite(data: favoriteRequest): Observable<favoriteResponse> {

    return this.http.post<favoriteRequest>(`${this.jsonApiUrl}/fav`, data);

  }

  deleteFromFavorite(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.jsonApiUrl}/fav/${jobId}`)
  }


}
