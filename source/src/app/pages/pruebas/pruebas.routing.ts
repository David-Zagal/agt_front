import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasComponent } from './pruebas.component';


const routes: Routes = [
    {
        path: '',
        component: PruebasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PruebasRoutingModule { }