import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../core/services/route-state.service';
import { SessionService } from '../../core/services/session.service';
import { UserResponse } from '../../core/models/services/response/user-response.model';
import { notification } from '../../core/models/notification.model';
import { UserIdleService } from 'angular-user-idle';
import { ThemeService } from '../../core/services/theme.service';
import { UserContextService } from '../../core/services/user-context.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../login/login.service';
import { VersionService } from '../../core/services/version.service';
import { constantes } from '../../core/common/constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserResponse;
  displayNotifications: boolean;
  notifications: notification[];
  locale: string;
  languages: any[];
  selectedLanguage: any;
  app: string;
  frontVersion: string;
  backVersion: any;
  frontDate: string;

  @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private themeService: ThemeService,
    private userContextService: UserContextService,
    public translate: TranslateService,
    private loginService: LoginService,
    public versionService: VersionService) {

    this.displayNotifications = false;

    this.languages = [
      { name: 'Spain', locale: 'es', flag: 'espanol.png' },
      //{ name: 'UK', locale: 'en', flag: 'ingles.png' },
    ];

    const selectedTheme = this.sessionService.getItem('selected-theme');
    if (selectedTheme) {
      this.selectTheme(selectedTheme);
    }

    this.app = environment.aplicacion;
  }

  ngOnInit() {
    this.user = this.sessionService.getItem('currentUser');
    this.frontVersion = this.versionService.getFrontVersion();
    this.frontDate = this.versionService.getFrontDate();
    /*this.versionService.getBackVersion().subscribe(res => {
      this.backVersion = res;
    });
    */
    this.notifications = [];
    for (let i = 1; i <= 5; i++) {
      const notificationObj = new notification('Message ' + i, new Date(), null);
      this.notifications.push(notificationObj);
    }

    this.locale = this.sessionService.getItem('ng-prime-language');
    this.languages.forEach(languague => {
      if (languague.locale === this.locale) {
        this.selectedLanguage = languague;
      }
    });

    // Start watching for user inactivity.
    // this.userIdle.startWatching();

    // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe();

    // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => {
    //  this.logout();
    // });
  }

  logout() {
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();

    // revoca refresh token en bbdd
    const observable = this.loginService.logout(window.sessionStorage.getItem(constantes.REFRESH_TOKEN_KEY));
    observable.subscribe(result => {
      // console.log("HECHO")
    });

    // Borra los tokens y objetos de sesion en navegador
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);
  }


  showNotificationSidebar() {
    this.displayNotifications = true;
  }

  toggleMenu() {
    this.toggleMenubar.emit();
  }

  selectTheme(theme: string) {
    this.sessionService.setItem('selected-theme', theme);
    this.themeService.selectTheme(theme);
  }

  onLanguageChange() {
    this.locale = this.selectedLanguage.locale;
    if (this.locale === undefined || this.locale == null || this.locale.length === 0) {
      this.locale = 'es';
    }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.locale);
    //localStorage.setItem('ng-prime-language', this.locale);
    this.sessionService.setItem('ng-prime-language', this.locale);
    //window.location.reload();
  }
}