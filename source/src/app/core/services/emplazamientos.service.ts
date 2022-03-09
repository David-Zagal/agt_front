import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { constantes } from "../common/constantes";
import { EmplazamientoResponse } from "../models/services/response/emplazamiento-response.model";
import { ServiceResponse } from "../models/services/response/service-response.model";
import { RestService } from "./rest.service";

@Injectable()
/**
 * user service class
 */
export class EmplazamientosService {

    constructor(private restService: RestService) {}

    getList(): Observable<ServiceResponse<EmplazamientoResponse[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.listEmplazamientos, null)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse[]>) => res));
    }

    getEmplazamiento(idEmplazamiento: number): Observable<ServiceResponse<EmplazamientoResponse>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.getEmplazamiento + idEmplazamiento)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse>) => res));
    }

    getEmplazamientoActivo(): Observable<ServiceResponse<EmplazamientoResponse[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.getEmplazamientoActivo, null)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse[]>) => res));
    }

    addEmplazamiento(emplazamientoResponse: EmplazamientoResponse) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.addEmplazamiento, emplazamientoResponse)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse>) => res));
    }

    editEmplazmiento(emplazamientoResponse: EmplazamientoResponse) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.editEmplazamiento, emplazamientoResponse)
            .pipe(map((res: ServiceResponse<EmplazamientoResponse>) => res));
    }

    deleteEmplazamiento(idEmplazamiento: number) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.deleteEmplazamiento + idEmplazamiento)
            .pipe(map((res: ServiceResponse<number>) => res));
    }

}