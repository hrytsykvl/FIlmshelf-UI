import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewAddRequest } from '../models/review-add-request';
import { Observable } from 'rxjs';
import {
  API_URL_MOVIES,
  API_URL_REVIEWS,
  API_URL_USER_REVIEWS,
} from '../constants/api.urls';
import { UpdateReviewRequest } from '../models/update-review-request';
import { ReviewResponseAddRequest } from '../models/review-response-add-request';
import { Review } from '../models/review';
import { ReviewResponse } from '../models/review-response';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  public addReview(reviewAddRequest: ReviewAddRequest): Observable<Review> {
    return this.httpClient.post<Review>(`${API_URL_REVIEWS}`, reviewAddRequest);
  }

  public retrieveReview(reviewId: number): Observable<void> {
    return this.httpClient.get<void>(`${API_URL_REVIEWS}/${reviewId}`);
  }

  public updateReview(
    reviewId: number,
    reviewUpdateRequest: UpdateReviewRequest
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${API_URL_REVIEWS}/${reviewId}`,
      reviewUpdateRequest
    );
  }

  public deleteReview(reviewId: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL_REVIEWS}/${reviewId}`);
  }

  public addReviewResponse(
    reviewId: number,
    responseAddRequest: ReviewResponseAddRequest
  ): Observable<ReviewResponse> {
    return this.httpClient.post<ReviewResponse>(
      `${API_URL_REVIEWS}/${reviewId}/responses`,
      responseAddRequest
    );
  }

  public retrieveReviewResponses(reviewId: number): Observable<void> {
    return this.httpClient.get<void>(
      `${API_URL_REVIEWS}/${reviewId}/responses`
    );
  }

  public deleteReviewResponse(responseId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API_URL_REVIEWS}/responses/${responseId}`
    );
  }

  public retrieveReviewsForMovie(movieId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(
      `${API_URL_MOVIES}/${movieId}/reviews`
    );
  }

  public retrieveReviewsForUser(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${API_URL_USER_REVIEWS}`);
  }
}
