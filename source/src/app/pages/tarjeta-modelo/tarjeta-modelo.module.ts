import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaModeloComponent } from './tarjeta-modelo.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AppCommonModule } from '../../app.common.module';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';
import { TarjetaModeloService } from '../../core/services/tarjeta-modelo.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TarjetaModeloRoutingModule } from './tarjeta-modelo-routing.module';
import { FabricanteService } from '../../core/services/fabricante.service';

@NgModule({
  declarations: [TarjetaModeloComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    TarjetaModeloRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers: [
    TarjetaModeloService,
    CapitalizadoPipe,
    FabricanteService
  ]
})
export class TarjetaModeloModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}