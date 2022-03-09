import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaModeloComponent } from './tarjeta-modelo.component';

const routes: Routes = [
  { path: '', component: TarjetaModeloComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaModeloRoutingModule {}