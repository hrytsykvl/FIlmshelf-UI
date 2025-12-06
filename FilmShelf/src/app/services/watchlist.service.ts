import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_WATCHLIST } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { WatchlistResponse } from '../models/watchlist-response';
import { WatchlistCheck } from '../models/watchlist-check';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private httpClient: HttpClient) {}

  public retrieveWatchlist(id?: number): Observable<WatchlistResponse> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.get<WatchlistResponse>(`${API_URL_WATCHLIST}/${watchlistId}`);
  }

  public addMovieToWatchlist(movieId: number, id?: number): Observable<void> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.put<void>(`${API_URL_WATCHLIST}/${watchlistId}/movies/${movieId}`, { });
  }

  public checkDefaultWatchlistMovies(): Observable<WatchlistCheck> {
    return this.httpClient.get<WatchlistCheck>(`${API_URL_WATCHLIST}/default/movies`);
  }

  public removeMovieFromWatchlist(movieId: number, id?: number): Observable<void> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.delete<void>(`${API_URL_WATCHLIST}/${watchlistId}/movies/${movieId}`);
  }
}
