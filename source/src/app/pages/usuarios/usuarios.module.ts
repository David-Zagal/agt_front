import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { AppCommonModule } from '../../app.common.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MtoUsuarioService } from '../../core/services/mto-usuario.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CentrosService } from '../../core/services/centros.service';

@NgModule({
  declarations: [UsuariosComponent],
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
    }),
    MultiSelectModule
  ],
  providers:[
    MtoUsuarioService,
    CentrosService
  ]
})
export class UsuariosModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}