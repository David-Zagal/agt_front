import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserContextService } from '../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private userContextService: UserContextService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = this.userContextService.user$.getValue();
        ////MANEJO ROL
        //user.grupos[0].descripcion= "ADMINISTRADOR";
        ////FIN
        if (user != null) {
          //if(user.grupos[0].descripcion= "ADMINISTRADOR"){
            return true;
          /*}else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }*/
            
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
