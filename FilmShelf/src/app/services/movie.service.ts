import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_MOVIES } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { MovieListResponse } from '../models/movie-list-response';
import { MovieDetailsResponse } from '../models/movie-details-response';
import { MovieResponse } from '../models/movie-response';
import { LlmRecommendation } from '../models/llm-recommendation';
import { AppLanguage } from './language.service';

export type LlmProvider = 'claude' | 'ollama';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  public page(pageNumber: number, language: AppLanguage = 'en-US'): Observable<MovieListResponse> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('language', language);
    return this.httpClient.get<MovieListResponse>(API_URL_MOVIES, { params });
  }

  public findMovie(id: number, language: AppLanguage = 'en-US'): Observable<MovieDetailsResponse> {
    const params = new HttpParams().set('language', language);
    return this.httpClient.get<MovieDetailsResponse>(`${API_URL_MOVIES}/${id}`, { params });
  }

  public retrievePopularMovies(): Observable<MovieListResponse> {
    const params = new HttpParams().set('filter', 'popular');
    return this.httpClient.get<MovieListResponse>(API_URL_MOVIES, { params });
  }

  public retrieveRecommendedMovies(method?: string, language: AppLanguage = 'en-US'): Observable<MovieResponse[]> {
    let params = new HttpParams();
    if (method) {
      params = params.set('method', method);
    }
    params = params.set('language', language);
    return this.httpClient.get<MovieResponse[]>(
      `${API_URL_MOVIES}/recommendations`,
      { params }
    );
  }

  public retrieveLlmRecommendations(
    provider: LlmProvider = 'claude',
    language: AppLanguage = 'en-US'
  ): Observable<LlmRecommendation[]> {
    const params = new HttpParams().set('provider', provider).set('language', language);
    return this.httpClient.get<LlmRecommendation[]>(
      `${API_URL_MOVIES}/recommendations/llm`,
      { params }
    );
  }

  public searchMovies(searchQuery: string, language: AppLanguage = 'en-US'): Observable<MovieResponse[]> {
    const params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('language', language);
    return this.httpClient.get<MovieResponse[]>(`${API_URL_MOVIES}/search`, {
      params,
    });
  }
}
