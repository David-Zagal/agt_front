import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'monitor',
        loadChildren: () => import('./pages/monitor/monitor.module').then(m => m.MonitorModule)
    },
    {
        path: 'browser-not-supported',
        loadChildren: () => import('./browser-not-supported/browser-not-supported.module').then(m => m.BrowserNotSupportedModule)
    },
    /*{
        path: 'register',
        loadChildren: () => import('./register-user/register-user.module').then(m => m.RegisterUserModule)
    },*/
    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'pruebas/:',
            loadChildren: () => import('./pages/pruebas/pruebas.module').then(m => m.PruebasModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'listado/:',
            loadChildren: () => import('./pages/listado/listado.module').then(m => m.ListadoModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'documentum/:',
            loadChildren: () => import('./pages/documentum/documentum.module').then(m => m.DocumentumModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'usuarios/:',
            loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'roles/:',
            loadChildren: () => import('./pages/mto-roles/mto-roles.module').then(m => m.MtoRolesModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'emplazamientos/:',
            loadChildren: () => import('./pages/emplazamientos/emplazamientos.module').then(m => m.EmplazamientosModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'centros/:',
            loadChildren: () => import('./pages/centros/centros.module').then(m => m.CentrosModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'identificacion/:',
            loadChildren: () => import('./pages/identificacion/identificacion.module').then(m => m.IdentificacionModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'fabricante/:',
            loadChildren: () => import('./pages/fabricantes/fabricante.module').then(m => m.FabricanteModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'tarjetamodelo/:',
            loadChildren: () => import('./pages/tarjeta-modelo/tarjeta-modelo.module').then(m => m.TarjetaModeloModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'tarjetatipo/:',
            loadChildren: () => import('./pages/tarjeta-tipo/tarjeta-tipo.module').then(m => m.TipoTarjetaModule),
            canActivate: [AuthGuard]
        }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
