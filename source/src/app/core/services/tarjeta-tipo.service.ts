import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { constantes } from '../common/constantes';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { TarjetaTipoResponse } from '../models/services/response/tarjeta-tipo-model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TarjetaTipoService {

  constructor(private restService: RestService) {}

  getListTipoTarjeta(): Observable<ServiceResponse<TarjetaTipoResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.tarjetaTipo, null)
        .pipe(map((res: ServiceResponse<TarjetaTipoResponse[]>) => res));
  }

  getTipoTarjeta(idTarjetaTipo: number): Observable<ServiceResponse<TarjetaTipoResponse>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getTarjetaTipo + idTarjetaTipo)
        .pipe(map((res: ServiceResponse<TarjetaTipoResponse>) => res));
  }

  addTipoTarjeta(tarjetaResponse: TarjetaTipoResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.addTarjetaTipo, tarjetaResponse)
        .pipe(map((res: ServiceResponse<TarjetaTipoResponse>) => res));
  }

  editarTipoTarjeta(tarjetaResponse: TarjetaTipoResponse) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.editarTarjetaTipo, tarjetaResponse)
        .pipe(map((res: ServiceResponse<TarjetaTipoResponse>) => res));
  }

  deleteTipoTarjeta(idTarjetaTipo: number) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.deleteTarjetaTipo + idTarjetaTipo)
        .pipe(map((res: ServiceResponse<number>) => res));
  }
}