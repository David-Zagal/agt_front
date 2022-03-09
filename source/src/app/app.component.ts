import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { ThemeService } from './core/services/theme.service';
import { SessionService } from './core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import cssVars from 'css-vars-ponyfill';
import './../styles.css';
import { LayoutService } from './core/services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ng-Prime';
  showLoader: boolean;
  theme: string;

  constructor(private loaderService: LoaderService,
    private themeService: ThemeService,
    private sessionService: SessionService,
    private layoutService: LayoutService,
    translate: TranslateService,
    private router: Router,
    private cdRef: ChangeDetectorRef) {

    var theme = this.sessionService.getItem("selected-theme");
    if (theme != null && theme.length > 0) {
      this.theme = theme;
      this.themeService.selectTheme(theme);
    } else {
      this.theme = "theme-1";
    }

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');
    var language = this.sessionService.getItem("ng-prime-language");
    if (language != null && language.length > 0) {
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(language);
    } else {
      this.sessionService.setItem("ng-prime-language", 'es');
    }
  }

  ngOnInit() {
    if (this.browser()) {
      this.router.navigate(['/browser-not-supported']);
    } else {
      cssVars({});
      this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
      });

      this.themeService.theme.subscribe((val: string) => {
        this.theme = val;
      });
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(){
    this.layoutService.deleteItems();
  }

  browser() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return is_ie;
  }
}