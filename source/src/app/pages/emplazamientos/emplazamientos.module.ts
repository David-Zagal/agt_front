import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmplazamientosRoutingModule } from './emplazamientos-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EmplazamientosComponent } from './emplazamientos.component';
import { AppCommonModule } from '../../app.common.module';
import { EmplazamientosService } from '../../core/services/emplazamientos.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@NgModule({
  declarations: [
    EmplazamientosComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    EmplazamientosRoutingModule,
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
    EmplazamientosService,
    CapitalizadoPipe
  ]
})
export class EmplazamientosModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}