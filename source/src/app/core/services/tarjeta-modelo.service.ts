import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { constantes } from '../common/constantes';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { TarjetaModeloResponse } from '../models/services/response/tarjeta-modelo.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TarjetaModeloService {

  constructor(private restService: RestService) {}

  getListModeloTarjeta(): Observable<ServiceResponse<TarjetaModeloResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.tarjetas, null)
        .pipe(map((res: ServiceResponse<TarjetaModeloResponse[]>) => res));
  }

  getModeloTarjeta(idTarjetaModelo: number): Observable<ServiceResponse<TarjetaModeloResponse>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getTarjeta + idTarjetaModelo)
        .pipe(map((res: ServiceResponse<TarjetaModeloResponse>) => res));
  }

  getTarjetaModeloActivo(): Observable<ServiceResponse<TarjetaModeloResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getTarjetaActivo, null)
        .pipe(map((res: ServiceResponse<TarjetaModeloResponse[]>) => res));
  }

  addModeloTarjeta(tarjetaResponse: TarjetaModeloResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.addTarjetaModelo, tarjetaResponse)
        .pipe(map((res: ServiceResponse<TarjetaModeloResponse>) => res));
  }

  editarModeloTarjeta(tarjetaResponse: TarjetaModeloResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.editarTarjeta, tarjetaResponse)
        .pipe(map((res: ServiceResponse<TarjetaModeloResponse>) => res));
  }

  deleteModeloTarjeta(idTarjetaModelo: number) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.deleteTarjeta + idTarjetaModelo)
        .pipe(map((res: ServiceResponse<number>) => res));
  }
}