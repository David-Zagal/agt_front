import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebasRoutingModule } from './pruebas.routing';
import { PruebasComponent } from './pruebas.component';
import { AppCommonModule } from '../../app.common.module';

@NgModule({
  imports: [
    CommonModule,
    PruebasRoutingModule,
    AppCommonModule
  ],
  declarations: [PruebasComponent]
})
export class PruebasModule { }