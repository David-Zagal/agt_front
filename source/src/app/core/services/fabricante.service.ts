import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { constantes } from '../common/constantes';
import { environment } from "../../../environments/environment";
import { FabricanteResponse } from '../models/services/response/fabricante-response.model';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  constructor(private restService: RestService) {}

  getListFabricante(): Observable<ServiceResponse<FabricanteResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.fabricantes, null)
        .pipe(map((res: ServiceResponse<FabricanteResponse[]>) => res));
  }
  
  getFabricante(idFabricante: number): Observable<ServiceResponse<FabricanteResponse>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getFabricante + idFabricante)
        .pipe(map((res: ServiceResponse<FabricanteResponse>) => res));
  }

  getFabricanteActivo(): Observable<ServiceResponse<FabricanteResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getFabricanteActivo, null)
        .pipe(map((res: ServiceResponse<FabricanteResponse[]>) => res));
  }

  addFabricante(fabricanteResponse: FabricanteResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.addFabricante, fabricanteResponse)
        .pipe(map((res: ServiceResponse<FabricanteResponse>) => res));
  }

  editFabricante(fabricanteResponse: FabricanteResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.editFabricante, fabricanteResponse)
        .pipe(map((res: ServiceResponse<FabricanteResponse>) => res));
  }

  deleteFabricante(idFabricante: number){
    return this.restService.post(environment.apiRestJava + constantes.endpoints.deleteFabricante + idFabricante)
         .pipe(map((res: ServiceResponse<number>) => res));
  }
}