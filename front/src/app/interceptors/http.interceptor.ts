import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../shared/services/auth/token.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._tokenService.getToken();

    if (token) {
      const authReq = req.clone({
        setHeaders: { authorization: token },
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpResponse) {
            if (error.status === 401) this._authService.logout();
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}
