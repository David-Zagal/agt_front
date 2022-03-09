import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PermisoResponse } from '../models/services/response/permiso-response.model';
import { RestService } from './rest.service';
import { UserDataService } from './user-data.service';
import { ServiceResponse } from '../models/services/response/service-response.model';
import { CustomMenuItem } from '../models/services/response/menu-item-response.model';
import { constantes } from '../../core/common/constantes';

@Injectable()
/**
 * menu data service
 */
export class MenuDataService {

    constructor(private restService: RestService,
        private userdataService: UserDataService) { }

    /*getMenuList(payload: any) {
        let result = [
            {
                Label: 'Home', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Servicio comidas', Icon: 'fa-users', RouterLink: '/main/employees', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Facturación', Icon: 'fa-sitemap', RouterLink: '/main/departments', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Pruebas', Icon: 'fa-info-circle', RouterLink: '/main/pruebas', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Administración', Icon: 'fa-envelope', RouterLink: '/main/contactus', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Menu Level 1', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
                    { Label: 'Menu Level 1.1', RouterLink: null, Childs: null, IsChildVisible: false },
                    {
                        Label: 'Menu Level 1.2', RouterLink: null, IsChildVisible: false, Childs: [
                            { Label: 'Menu Level 1.2.1', RouterLink: null, Childs: null, IsChildVisible: false },
                            { Label: 'Menu Level 1.2.2', RouterLink: null, Childs: null, IsChildVisible: false }
                        ]
                    }
                ], IsChildVisible: false
            }
        ];

        return of(result);
    }*/


    getMenuList(payload: any): Observable<ServiceResponse<CustomMenuItem[]>> {
        return this.restService.get(environment.apiRestJava + constantes.endpoints.menu, payload)
            .pipe(map((res: ServiceResponse<CustomMenuItem[]>) => res));
    }

   /* getPermisos(funcionalidades: any) {
        let permisos: string[];
        permisos = [];
        for (const funcionalidad of funcionalidades) {
            const observable = this.userdataService.checkPermissions(funcionalidad.text);
            observable.subscribe((res: Permiso[]) => {
                if (res) {
                    if (res[0].descripcionPermiso == 'LECTURA') {
                        for (const lectura of funcionalidad.acciones.lectura) {
                            permisos.push(lectura);
                        }
                    }
                    if (res[0].descripcionPermiso == 'ESCRITURA') {
                        for (const escritura of funcionalidad.acciones.escritura) {
                            permisos.push(escritura);
                        }
                        for (const lectura of funcionalidad.acciones.lectura) {
                            permisos.push(lectura);
                        }
                    }
                }
            });
        }
        return permisos;
    }*/

    getPermisos(funcionalidades: any) {
        let permisos: string[];
        permisos = [];
        for (const funcionalidad of funcionalidades) {
            const observable = this.userdataService.checkPermissions(funcionalidad.text);
            observable.subscribe((res: ServiceResponse<PermisoResponse[]>) => {
                if (res && res.restResponse) {
                    let restResponse = res.restResponse;
                    if (restResponse[0].codPermiso == 'L') { // CODIGO DEL PERMISO EN BBDD
                        for (const lectura of funcionalidad.acciones.lectura) {
                            permisos.push(lectura);
                        }
                    }
                    if (restResponse[0].codPermiso == 'T') { // CODIGO DEL PERMISO EN BBDD
                        for (const escritura of funcionalidad.acciones.escritura) {
                            permisos.push(escritura);
                        }
                        for (const lectura of funcionalidad.acciones.lectura) {
                            permisos.push(lectura);
                        }
                    }
                }
            });
        }
        return permisos;
    }
}