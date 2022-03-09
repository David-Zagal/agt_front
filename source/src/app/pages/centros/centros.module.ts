import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CentrosRoutingModule } from './centros-routing.module';
import { CentrosComponent } from './centros.component';
import { AppCommonModule } from '../../app.common.module';
import { CentrosService } from '../../core/services/centros.service';
import { EmplazamientosService } from '../../core/services/emplazamientos.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@NgModule({
  declarations: [
    CentrosComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    CentrosRoutingModule,
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
    CentrosService,
    EmplazamientosService,
    CapitalizadoPipe
  ]
})
export class CentrosModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}