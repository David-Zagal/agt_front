import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { RouterState } from '@angular/router';
import { RouteStateService } from './route-state.service';
import { MenuItem } from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private titulo$ = new Subject<String>();

  titulo: String;

  private items$ = new Subject<MenuItem[]>();
  items: MenuItem[];
  cont: number = 0;

  constructor(public translate: TranslateService) {
    this.items = [];
  }

  getTitulo$(): Observable<String> {
    return this.titulo$.asObservable();
  }
  
  setTitulo(titulo: String) {
    this.titulo = titulo;
    this.titulo$.next(this.titulo);
  }

  getItems() {
    return this.items;
  }

  getItems$(): Observable<MenuItem[]> {
    return this.items$.asObservable();
  }

  setItems(item: MenuItem) {
    this.items.push({ label: item.label, command: () => { this.redirect(item.label, item.url) } });
    this.items$.next(this.items);
  }

  deleteItems() {
    this.cont = 0;
    this.items.forEach(item => {
      this.items.splice(this.cont);
      this.cont++;
    });
    this.items.push({ label: environment.aplicacion.toUpperCase() });
    this.items$.next(this.items);
  }

  redirect(label, url) {
    // sthis.routeStateService.add(label, url, '', false);
  }
}