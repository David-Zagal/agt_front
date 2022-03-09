import { Component, OnInit, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { ToastService } from '../core/services/toast.service';
import { LoaderService } from '../core/services/loader.service';
import { MenuDataService } from '../core/services/menu-data.service';
import { CustomMenuItem } from '../core/models/services/response/menu-item-response.model';
import { ApplicationStateService } from '../core/services/application-state.service';
import { MenuItem, Sidebar } from 'primeng';
import { LayoutService } from '../core/services/layout.service';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../core/models/services/response/service-response.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit, OnInit{

  menuItems: CustomMenuItem[];

  isMenuVisible: boolean;
  
  isMobileResolution: boolean = false;
  titulo$: Observable<String>;
  tituloPagina: String;
  items: MenuItem[]=[];
  items$: Observable<MenuItem[]>;
  //item: MenuItem = {label: environment.aplicacion.toUpperCase(), url: ''};
  @ViewChild("menubar", { static: true }) menubar: Sidebar;
  constructor(private toastService: ToastService,
    private loaderService: LoaderService,
    private menuDataService: MenuDataService,
    private layoutService: LayoutService,
    private applicationStateService: ApplicationStateService) {
      this.items = this.layoutService.getItems();
  }

  ngOnInit() {
    this.loaderService.show();
    this.layoutService.deleteItems();
      this.items$ = this.layoutService.getItems$();
      this.items$.subscribe(items => {
        this.items = items;
      });
    this.titulo$ = this.layoutService.getTitulo$();
    this.titulo$.subscribe(titulo => {
      this.tituloPagina = titulo;
    });

    const observable = this.menuDataService.getMenuList({});

    observable.subscribe((res: ServiceResponse<CustomMenuItem[]>) => {
      this.menuItems = res.restResponse;
      this.isMobileResolution = this.applicationStateService.getIsMobileResolution();
      if (this.isMobileResolution) {
        this.isMenuVisible = false;
      }
      else {
        this.isMenuVisible = true;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loaderService.hide();
    }, 1000);
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}