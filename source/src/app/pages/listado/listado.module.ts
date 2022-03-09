import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { AppCommonModule } from '../../app.common.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OpcMenuService } from '../services/opc-menu.service';


@NgModule({
  declarations: [ListadoComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    ListadoRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers:[
    OpcMenuService
  ]
})
export class ListadoModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
