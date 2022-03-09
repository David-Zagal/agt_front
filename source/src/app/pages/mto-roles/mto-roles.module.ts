import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiSelectModule, ListboxModule } from 'primeng';
import { AppCommonModule } from '../../app.common.module';
import { HttpLoaderFactory } from '../monitor/monitor.module';
import { MtoRolesComponent } from './mto-roles.component';
import { MtoRolesRoutingModule } from './mto-roles-routing.module';
import { MtoRolService } from '../../core/services/mto-rol.service';


@NgModule({
  declarations: [MtoRolesComponent],
  imports: [
    CommonModule,
    MtoRolesRoutingModule,
    AppCommonModule,
    MultiSelectModule,
    ListboxModule,
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
    MtoRolService
  ]
})
export class MtoRolesModule { }
