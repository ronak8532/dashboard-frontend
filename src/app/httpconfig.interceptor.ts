import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpHeaders,
  HttpSentEvent,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
  }

  // tslint:disable-next-line:max-line-length
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request, this._auth.authToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((err as HttpErrorResponse).status) {
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      console.log("token", token);
      if (request.url.indexOf('/login') === -1) {
        return request.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        });
      }
    }
    return request;
  }
}
