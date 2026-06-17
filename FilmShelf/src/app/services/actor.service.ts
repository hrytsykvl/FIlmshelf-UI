import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_ACTORS } from '../constants/api.urls';
import { Observable } from 'rxjs';
import { ActorDetailsResponse } from '../models/actor-details-response';
import { AppLanguage } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private httpClient: HttpClient) { }

  public findActor(id: number, language: AppLanguage = 'en-US') : Observable<ActorDetailsResponse> {
    const params = new HttpParams().set('language', language);
    return this.httpClient.get<ActorDetailsResponse>(`${API_URL_ACTORS}/${id}`, { params });
  }
}
