import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { UserResponse } from '../models/services/response/user-response.model';
import { UserDataService } from '../services/user-data.service';

@Pipe({
  name: 'dicodefNombre'
})
export class DicodefNombrePipe implements PipeTransform {

  private data: any = null;
  private userDataService: UserDataService;
  constructor() { }

  transform(value: any, args?: any): Observable<String> {
    return new Observable(observer => {
      this.userDataService.getUserDicodef(value).subscribe((response: ServiceResponse<UserResponse>) => {
        observer.next(
          this.data = response.restResponse.nombreUsuario + ' '
          + response.restResponse.primerApellido + ' '
          + response.restResponse.segundoApellido);
        observer.complete();
      });
    });
  }

}
