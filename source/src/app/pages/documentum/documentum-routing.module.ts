import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentumComponent } from './documentum.component';

const routes: Routes = [
  {path: '',
  component: DocumentumComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentumRoutingModule { }
