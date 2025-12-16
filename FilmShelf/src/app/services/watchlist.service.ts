import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_WATCHLIST } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { WatchlistResponse } from '../models/watchlist-response';
import { WatchlistCheck } from '../models/watchlist-check';
import { UpsertWatchlistRequest } from '../models/upsert-watchlist-request';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private httpClient: HttpClient) {}

  public createWatchlist(upsertWatchlistRequest: UpsertWatchlistRequest): Observable<number> {
    return this.httpClient.post<number>(`${API_URL_WATCHLIST}`, upsertWatchlistRequest);
  }

  public updateWatchlist(upsertWatchlistRequest: UpsertWatchlistRequest, id: number): Observable<void> {
    return this.httpClient.put<void>(`${API_URL_WATCHLIST}/${id}`, upsertWatchlistRequest);
  }

  public deleteWatchlist(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL_WATCHLIST}/${id}`);
  }

  public retrieveWatchlist(id?: number): Observable<WatchlistResponse> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.get<WatchlistResponse>(`${API_URL_WATCHLIST}/${watchlistId}`);
  }

  public addMovieToWatchlist(movieId: number, id?: number): Observable<void> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.put<void>(`${API_URL_WATCHLIST}/${watchlistId}/movies/${movieId}`, { });
  }

  public checkWatchlistsMovies(): Observable<WatchlistCheck[]> {
    return this.httpClient.get<WatchlistCheck[]>(`${API_URL_WATCHLIST}/movies`);
  }

  public removeMovieFromWatchlist(movieId: number, id?: number): Observable<void> {
    const watchlistId = id ?? Number(localStorage.getItem('defaultWatchlistId'));
    return this.httpClient.delete<void>(`${API_URL_WATCHLIST}/${watchlistId}/movies/${movieId}`);
  }
}
