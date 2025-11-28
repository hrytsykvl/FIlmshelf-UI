import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_ACTORS } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { ActorDetailsResponse } from '../models/actor-details-response';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private httpClient: HttpClient) { }

  public findActor(id: number) : Observable<ActorDetailsResponse> {
    return this.httpClient.get<ActorDetailsResponse>(`${API_URL_ACTORS}/${id}`);
  }
}
