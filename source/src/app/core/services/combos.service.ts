import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class CombosService {

  constructor(private restService: RestService) { }

  /*listTipoPrograma() {
    return this.restService.get(environment.apiRestJava + environment.endpoints.listTipoPrograma)
      .pipe(map((res: TipoPrograma[]) => res));
  }

  listClasificacion() {
    return this.restService.get(environment.apiRestJava + environment.endpoints.listClasificacion)
      .pipe(map((res: GradoClasificacion[]) => res));
  }*/
}
