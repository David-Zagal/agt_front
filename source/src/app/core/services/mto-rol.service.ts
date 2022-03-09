import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { constantes } from '../common/constantes';
import { RolResponse } from '../models/services/response/rol-response.model';

@Injectable()
/**
 * user service class
 */
export class MtoRolService {


  constructor(private restService: RestService) {

  }

  getList(): Observable<ServiceResponse<RolResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.listRoles, null)
        .pipe(map((res: ServiceResponse<RolResponse[]>) => res));
  }

}
