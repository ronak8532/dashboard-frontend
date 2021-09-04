import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _route: Router,
  ) { }


  public authenticateUser(user: any) {
    return this._http.post<any>(`${environment.URL}/login`, user);
  }

  public registerUser(user: any) {
    return this._http.post<any>(`${environment.URL}/create`, user);
  }

  public authToken() {
    return localStorage.getItem('token') || "";
  }



}
