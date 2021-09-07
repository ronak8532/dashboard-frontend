import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of, EMPTY } from 'rxjs';
import { map, concatMap, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../models/account';


declare const FB: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;
  constructor(private _http: HttpClient, private _route: Router) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    this.facebookLogin()
      .pipe(concatMap((accessToken) => this.apiAuthenticate(accessToken)))
      .subscribe(() => {
        // get return url from query parameters or default to home page
        this._route.navigateByUrl('/');
      });
  }

  facebookLogin() {
    // login with facebook and return observable with fb access token on success
    return from(new Promise<any>((resolve) => FB.login(resolve))).pipe(
      concatMap(({ authResponse }) => {
        if (!authResponse) return EMPTY;
        return of(authResponse.accessToken);
      })
    );
  }

  apiAuthenticate(accessToken: string) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    localStorage.setItem('tokken', accessToken);

    return accessToken;
  }

  public authenticateUser(user: any) {
    return this._http.post<any>(`${environment.URL}/login`, user);
  }

  public registerUser(user: any) {
    return this._http.post<any>(`${environment.URL}/create`, user);
  }

  public update(user: any, user_id: any) {
    return this._http.post<any>(`${environment.URL}/update/${user_id}`, user);
  }

  public getUser(user_id: any) {
    return this._http.get<any>(`${environment.URL}/me/${user_id}`);
  }

  public authToken() {
    return localStorage.getItem("token") || "";
  }
}
