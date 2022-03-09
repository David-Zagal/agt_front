import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RestService } from './rest.service';
import { version, fecha } from '../../../../package.json';
import { constantes } from '../common/constantes';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  public versionFront: string = version;
  public fechaFront: string = fecha;
  public fechaBack: String = 'No disponible';
  public versionBack: String = 'No disponible';

  constructor(private restService: RestService) {
    this.restService.get(environment.apiRestJava + constantes.endpoints.versionBack + '?mostrarCargando=' + false)
      .pipe(map((response: any) => response)).subscribe(res => {
        if (res) {
          this.versionBack = res.version;
          this.fechaBack = res.timeStamp;
        }
      });

  }

  // Servicio de consulta: devuelve los datos de la versión del back
  /* getBackVersion(): Observable<any> {
     return this.restService.get(environment.apiRestJava + environment.endpoints.versionBack)
       .pipe(map((response: any) => response));
   } */

  // Servicio de consulta: devuelve los datos de la versión del front
  getFrontVersion() {
    return this.versionFront;
  }

  getFrontDate() {
    return this.fechaFront;
  }

  getBackVersion() {
    return this.versionBack;
  }

  getBackDate() {
    return this.fechaBack;
  }

}
