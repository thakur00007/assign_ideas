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

  get LoggedIn(){
    console.log();
    
    return this.isLoggedIn.asObservable()
  }

  
  
  private baseUrl = "http://localhost:5000/auth/";
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

  
}
