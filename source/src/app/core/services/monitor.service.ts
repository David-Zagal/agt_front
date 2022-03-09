import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from '../../../environments/environment';
import { constantes } from '../common/constantes';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private restService: RestService) { }
  comprobarEstados(){

    return this.restService.get(environment.apiRestJava+constantes.endpoints.monitor);
  }

}
