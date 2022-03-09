import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaTipoComponent } from './tarjeta-tipo.component';
import { AppCommonModule } from '../../app.common.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';
import { TarjetaTipoRoutingModule } from './tarjeta-tipo-routing.module';
import { TarjetaTipoService } from '../../core/services/tarjeta-tipo.service';
import { TarjetaModeloService } from '../../core/services/tarjeta-modelo.service';


@NgModule({
  declarations: [TarjetaTipoComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    TarjetaTipoRoutingModule,
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
    TarjetaTipoService,
    CapitalizadoPipe,
    TarjetaModeloService
  ]
})
export class TipoTarjetaModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}