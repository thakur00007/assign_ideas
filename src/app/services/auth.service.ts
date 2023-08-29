import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { AllResponse } from '../models/all-response';
import { LocalStorage } from '../helper/local-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localstorage: LocalStorage = new LocalStorage()
  isLoggedIn = new BehaviorSubject<boolean>(false)
   localStorage: LocalStorage = new LocalStorage()

  get LoggedIn(){
    console.log();

    return this.isLoggedIn.asObservable()
  }



  private baseUrl = "http://localhost:3000/api/v1/auth/";
  constructor(private _http: HttpClient) { }

  register(user: User): Observable<AllResponse>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this._http.post(this.baseUrl+"signup", user, httpOptions).pipe(
      map((res: any) => {
        return res
      })
    )
  }


  login(user: User): Observable<AllResponse>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this._http.post(this.baseUrl+"login", user, httpOptions).pipe(
      map((res: any) =>  res)
    )
  }
  updatePass(data: any): Observable<AllResponse>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this._http.post(this.baseUrl+"updatePass", {auth: this.localStorage.getAuthDetl(), data}, httpOptions).pipe(
      map((res: any) =>  res)
    )
  }

}
