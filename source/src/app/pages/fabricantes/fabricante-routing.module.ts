import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricantesComponent } from './fabricantes.component';

const routes: Routes = [
  { path: '', component: FabricantesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule {}