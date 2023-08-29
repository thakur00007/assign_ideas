import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AllResponse } from '../models/all-response';
import { LocalStorage } from '../helper/local-storage';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  private baseUrl = "http://localhost:3000/api/v1/";
  constructor(private _http: HttpClient) { }
  localStorage: LocalStorage = new LocalStorage()

  fetchAllIdeas(): Observable<AllResponse>{
    return this._http.get(this.baseUrl+"ideas/").pipe(
      map((res: any) => {
        return res
      })
    )
  }

  fetchTags(): Observable<AllResponse>{
    return this._http.get(this.baseUrl+"fetch/tag-list/").pipe(
      map((res: any) => {
        return res
      })
    )
  }

  assignIdea(data: any): Observable<AllResponse>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this._http.post(this.baseUrl+"ideas", {auth: this.localStorage.getAuthDetl(), data: data}, httpOptions).pipe(
      map((res: any) => {
        return res
      })
    )
  }

}
