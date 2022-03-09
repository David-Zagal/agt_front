// angular default
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Prime NG
// app related
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AppRoutingModule } from './app.routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderService } from './core/services/loader.service';
import { ToastService } from './core/services/toast.service';
import { RouteStateService } from './core/services/route-state.service';
import { SessionService } from './core/services/session.service';
import { UserIdleModule } from 'angular-user-idle';
import { ThemeService } from './core/services/theme.service';
import { ApplicationStateService } from './core/services/application-state.service';
import { UserDataService } from './core/services/user-data.service';
import { MenuDataService } from './core/services/menu-data.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserContextService } from './core/services/user-context.service';
import { AppCommonModule } from './app.common.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { interceptorProviders } from './core/interceptors/interceptorsProviders';
import { DicodefNombrePipe } from './core/pipes/dicodef-nombre.pipe';
import { MessageService, SelectButtonModule, ConfirmationService } from 'primeng';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DicodefNombrePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: null }),
    HttpClientModule,
    AppCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    MessageService,
    AuthGuard,
    LoaderService,
    ToastService,
    RouteStateService,
    SessionService,
    ThemeService,
    ApplicationStateService,
    UserDataService,
    MenuDataService,
    UserContextService,
    CookieService,
    SelectButtonModule,
    ConfirmationService,
    DatePipe,
    interceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
