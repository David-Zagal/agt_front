import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RestService } from '../../core/services/rest.service';
import { ServiceResponse } from '../../core/models/services/response/service-response.model';
import { OpcMenu } from '../models/service/response/opc-menu.model';
import { constantes } from '../../core/common/constantes';

@Injectable()
/**
 * menu data service
 */
export class OpcMenuService {

    constructor(private restService: RestService) { }

    

    getList(): Observable<ServiceResponse<OpcMenu[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.listOpcMenu, null)
            .pipe(map((res: ServiceResponse<OpcMenu[]>) => res));
    }

   
}