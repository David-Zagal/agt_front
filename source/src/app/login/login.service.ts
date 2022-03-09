import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { RestService } from '../core/services/rest.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../core/models/services/response/service-response.model';
import { LoginResponse } from '../core/models/services/response/login-response.model';
import { constantes } from '../core/common/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private restService: RestService,
    private cookieService: CookieService) { }

  auth(payload: any): Observable<ServiceResponse<LoginResponse>> {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.signin, payload)
      .pipe(map((res: ServiceResponse<LoginResponse>) => res));
  }

  saveToken(token: any) {
    window.sessionStorage.setItem(constantes.TOKEN_KEY, token.tokenType + ' ' + token.accessToken);
  }

  logout(payload: any) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.signout, payload);
  }

  refresh(payload: any): Observable<ServiceResponse<LoginResponse>> {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.refresh, payload).pipe(
      tap((res: ServiceResponse<LoginResponse>) => {
        if (res != null && res.restResponse != null) {
          this.saveToken(res.restResponse);
        }
      })
    );
  }

  saveRefreshToken(token: any) {
    window.sessionStorage.setItem(constantes.REFRESH_TOKEN_KEY, token.refreshToken);
  }
}
