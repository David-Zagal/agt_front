import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { UserResponse } from '../models/services/response/user-response.model';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { constantes } from '../common/constantes';
import { RolResponse } from '../models/services/response/rol-response.model';

@Injectable()
/**
 * user service class
 */
export class MtoUsuarioService {

  constructor(private restService: RestService) {}

  getList(): Observable<ServiceResponse<UserResponse[]>> {
      return this.restService.get(environment.apiRestJava + constantes.endpoints.listUsuarios, null)
        .pipe(map((res: ServiceResponse<UserResponse[]>) => res));
  }

  getListRoles(): Observable<ServiceResponse<RolResponse[]>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.listRoles, null)
      .pipe(map((res: ServiceResponse<RolResponse[]>) => res));
  }
  
  getRolesByUser(codUsuario: string): Observable<ServiceResponse<RolResponse[]>> {
      return this.restService.get(environment.apiRestJava + constantes.endpoints.getRolesByUser + codUsuario)
        .pipe(map((res: ServiceResponse<RolResponse[]>) => res));
  }

  getUsuario(codUsuario: string): Observable<ServiceResponse<UserResponse>> {
      return this.restService.get(environment.apiRestJava + constantes.endpoints.getUsuario + codUsuario)
        .pipe(map((res: ServiceResponse<UserResponse>) => res));
  }

  addUsuario(userResponse: UserResponse) {
      return this.restService.post(environment.apiRestJava + constantes.endpoints.addUsuario, userResponse)
        .pipe(map((res: ServiceResponse<UserResponse>) => res));
  }

  editUsuario(userResponse: UserResponse) {
      return this.restService.post(environment.apiRestJava + constantes.endpoints.editUsuario, userResponse)
        .pipe(map((res: ServiceResponse<UserResponse>) => res));
  }

  deleteUsuario(codUsuario: string) {
      return this.restService.delete(environment.apiRestJava + constantes.endpoints.deleteUsuario + codUsuario);
  }

  saveRoles(userResponse: UserResponse){
      return this.restService.post(environment.apiRestJava + constantes.endpoints.saveRolesUsuario, userResponse);
  }

  getUsuarioDicodef(dni: string): Observable<ServiceResponse<UserResponse>> {
    return this.restService.get(environment.apiRestJava + constantes.endpoints.getUsuarioDicodef + dni).pipe(map((res: ServiceResponse<UserResponse>) => res));
  }
}