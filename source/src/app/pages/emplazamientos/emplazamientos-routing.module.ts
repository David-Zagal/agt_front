import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmplazamientosComponent } from './emplazamientos.component';

const routes: Routes = [
  { path: '', component: EmplazamientosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmplazamientosRoutingModule {}