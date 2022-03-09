import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MtoRolesComponent } from './mto-roles.component';

const routes: Routes = [
  {path: '',
  component: MtoRolesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtoRolesRoutingModule { }
