import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_MOVIES } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { MovieListResponse } from '../models/movie-list-response';
import { MovieDetailsResponse } from '../models/movie-details-response';
import { MovieResponse } from '../models/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  public page(pageNumber: number): Observable<MovieListResponse> {
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.httpClient.get<MovieListResponse>(API_URL_MOVIES, { params });
  }

  public findMovie(id: number): Observable<MovieDetailsResponse> {
    return this.httpClient.get<MovieDetailsResponse>(`${API_URL_MOVIES}/${id}`);
  }

  public retrievePopularMovies(): Observable<MovieListResponse> {
    const params = new HttpParams().set('filter', 'popular');
    return this.httpClient.get<MovieListResponse>(API_URL_MOVIES, { params });
  }

  public retrieveRecommendedMovies(): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(
      `${API_URL_MOVIES}/recommendations`
    );
  }

  public searchMovies(searchQuery: string): Observable<MovieResponse[]> {
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.httpClient.get<MovieResponse[]>(`${API_URL_MOVIES}/search`, {
      params,
    });
  }
}
