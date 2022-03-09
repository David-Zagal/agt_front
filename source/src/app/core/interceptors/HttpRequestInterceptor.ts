import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize, catchError, every, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from '../services/user-context.service';
import { Router } from '@angular/router';
import { constantes } from '../common/constantes';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  [x: string]: any;
  constructor(private loaderService: LoaderService,
    private toastService: ToastService,
    private translate: TranslateService,
    private userContextService: UserContextService,
    private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      catchError((error, caught) => {
        this.toastService.clear();

        if (error instanceof HttpErrorResponse) {
          const errResp = <HttpErrorResponse>error;
          this.manageErrors(req.url, errResp);
        }

        return throwError(error);

      }),
      /*tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.status && evt.status === 200) {
            this.toastService.clear();
          }
        }
      }),*/
      finalize(() => this.loaderService.hide())
    );
  }


  manageErrors(url: String, error: HttpErrorResponse) {
    const httpCode = error.status;
    let codError = 'error.backend.conexion.' + httpCode;
    let errorDesc = this.translate.instant(codError);

    if (httpCode !== 0) {

      if (httpCode === 403) {
        if (url.indexOf(constantes.endpoints.signin) === -1) {
          this.userContextService.logout();
          this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
          errorDesc = this.translate.instant('error.backend.session');
        } else {
          errorDesc = null;
        }

      } else {
        if (error.error && error.error.descripcion) {
          if (error.error.controlado) {
            errorDesc = error.error.descripcion;
          }
        }
      }

    } else {
      // el api esta offline o se ha llamado a una url que no tiene las cabeceras del cors, por lo que no hay status code
      codError = 'error.backend.conexion.generico';
      errorDesc = '503 - ' + this.translate.instant(codError);
    }

    if (errorDesc != null) { // Algunos errores se manejan en la propia llamada (login por ejemplo)
      this.toastService.addSingle('error', '', errorDesc, true);
    }
  }
}
