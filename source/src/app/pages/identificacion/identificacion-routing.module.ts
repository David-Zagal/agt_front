import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificacionComponent } from './identificacion.component';

const routes: Routes = [
  { path: '', component: IdentificacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentificacionRoutingModule {}