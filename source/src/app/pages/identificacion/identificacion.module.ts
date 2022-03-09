import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentificacionRoutingModule } from './identificacion-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IdentificacionComponent } from './identificacion.component';
import { AppCommonModule } from '../../app.common.module';
import { IdentificacionService } from '../../core/services/identificacion.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@NgModule({
  declarations: [
    IdentificacionComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    IdentificacionRoutingModule,
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
    IdentificacionService,
    CapitalizadoPipe
  ]
})
export class IdentificacionModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}