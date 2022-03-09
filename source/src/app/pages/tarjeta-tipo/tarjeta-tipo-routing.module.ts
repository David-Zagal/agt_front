import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaTipoComponent } from './tarjeta-tipo.component';

const routes: Routes = [
  { path: '', component: TarjetaTipoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaTipoRoutingModule {}