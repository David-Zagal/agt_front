import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppCommonModule } from '../../app.common.module';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';
import { FabricantesComponent } from './fabricantes.component';
import { FabricanteRoutingModule } from './fabricante-routing.module';
import { FabricanteService } from '../../core/services/fabricante.service';

@NgModule({
  declarations: [
    FabricantesComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    FabricanteRoutingModule,
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
    FabricanteService,
    CapitalizadoPipe
  ]
})
export class FabricanteModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}