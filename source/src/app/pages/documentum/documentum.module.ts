import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentumRoutingModule } from './documentum-routing.module';
import { DocumentumComponent } from './documentum.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppCommonModule } from '../../app.common.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [DocumentumComponent],
  imports: [
    CommonModule,
    DocumentumRoutingModule,
    AppCommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ]
})
export class DocumentumModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
