import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { constantes } from "../common/constantes";
import { CentroResponse } from "../models/services/response/centro-response.model";
import { EmplazamientoResponse } from "../models/services/response/emplazamiento-response.model";
import { ServiceResponse } from "../models/services/response/service-response.model";
import { RestService } from "./rest.service";

@Injectable()
/**
 * user service class
 */
export class CentrosService {
    constructor(private restService: RestService) {}

    getList(): Observable<ServiceResponse<CentroResponse[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.listCentros, null)
            .pipe(map((res: ServiceResponse<CentroResponse[]>) => res));
    }

    addCentro(centroResponse: CentroResponse) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.addCentro, centroResponse)
            .pipe(map((res: ServiceResponse<CentroResponse>) => res));
    }

    deleteCentro(idCentro: number) {
        return this.restService.delete(environment.apiRestJava + constantes.endpoints.deleteCentro + idCentro);
    }

    editCentro(centroResponse: CentroResponse) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.editCentro, centroResponse)
            .pipe(map((res: ServiceResponse<CentroResponse>) => res));
    }

    getCentro(idCentro: number): Observable<ServiceResponse<CentroResponse>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.getCentro + idCentro)
            .pipe(map((res: ServiceResponse<CentroResponse>) => res));
    }

    // Pa borrar por ahorro de codigo
    /*getEmplazamiento(idEmplazamiento: number): Observable<ServiceResponse<EmplazamientoResponse>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.getEmplazamiento + idEmplazamiento)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse>) => res));
    }

    getListEmpl(): Observable<ServiceResponse<EmplazamientoResponse[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.listEmplazamientos, null)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse[]>) => res));
    }*/
}