import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app.common.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectButtonModule } from 'primeng';
import { BrowserNotSupportedComponent } from './browser-not-supported.component';
import { BrowserNotSupportedRoutingModule } from './browser-not-supported.routing';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    BrowserNotSupportedRoutingModule,
    AppCommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  declarations: [BrowserNotSupportedComponent],
  exports: [TranslateModule]
})
export class BrowserNotSupportedModule {

}
