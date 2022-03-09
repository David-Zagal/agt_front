import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { constantes } from '../common/constantes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    [x: string]: any;
    private isRefreshing = false;
    constructor(
        private loginService: LoginService
    ) { }

    headers: HttpHeaders;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = this.addToken(req);
        return next.handle(modified).pipe(
            catchError((error, caught) => {
                console.log(error);
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(modified, next);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>) {
        this.setHeaders();

        const modified = request.clone({ headers: this.headers, withCredentials: true });
        return modified;
    }

    setHeaders() {
        const token = window.sessionStorage.getItem(constantes.TOKEN_KEY);
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Cache-Control', 'no-store, no-cache, private, max-age=0, must-revalidate')
            .set('Pragma', 'no-cache').set('Expires', '0');
        if (token) {
            this.headers = this.headers.set(constantes.AUTHORIZATION_HEADER_KEY, token);
        }
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            const params = window.sessionStorage.getItem(constantes.REFRESH_TOKEN_KEY);
            return this.loginService.refresh(params).pipe(
                switchMap(response => {
                    if (response.restResponse.accessToken && response.restResponse.accessToken !== '') {
                        this.isRefreshing = false;

                        this.setHeaders();
                        const again = request.clone({ headers: this.headers, withCredentials: true });
                        return next.handle(again).pipe(
                            tap(result => {

                            })
                        );
                    }
                }),

                catchError((error, caught) => {
                    this.isRefreshing = false;
                    return throwError(error);
                })
            );

        } else {
            const requestInicial = this.addToken(request);
            return next.handle(requestInicial);
        }
    }
}
