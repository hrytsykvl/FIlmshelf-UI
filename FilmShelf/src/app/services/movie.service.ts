import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_MOVIES } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { MovieListResponse } from '../models/movie-list-response';
import { MovieDetailsResponse } from '../models/movie-details-response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public page(pageNumber: number) : Observable<MovieListResponse> {
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.httpClient.get<MovieListResponse>(API_URL_MOVIES, { params });
  }

  public findMovie(id: number): Observable<MovieDetailsResponse> {
    return this.httpClient.get<MovieDetailsResponse>(`${API_URL_MOVIES}/${id}`);
  }
}
