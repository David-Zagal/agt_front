import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { constantes } from "../common/constantes";
import { RestService } from "./rest.service";
import { IdentificacionResponse } from "../models/services/response/identificacion-response.model";
import { MensajeIdentidadResponse } from "../models/services/response/mensajeIdentidad-response.model";
import { ServiceResponse } from "../models/services/response/service-response.model";

@Injectable()
/**
 * user service class
 */
export class IdentificacionService {

    constructor(private restService: RestService) {}

    enviarIdentificacion(identificacionResponse: IdentificacionResponse) {
        return this.restService.post(environment.apiRestJava + constantes.endpoints.enviarIdentificacion, identificacionResponse)
            .pipe(map((res: ServiceResponse<MensajeIdentidadResponse>) => res));
    }
}