import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng';
import { ToastService } from '../../core/services/toast.service';
import { MenuDataService } from '../../core/services/menu-data.service';
import { LayoutService } from '../../core/services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { OpcMenu } from '../models/service/response/opc-menu.model';
import { OpcMenuService } from '../services/opc-menu.service';
import { ServiceResponse } from '../../core/models/services/response/service-response.model';

@Component({
  selector: 'listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  funcionalidades: any = [
    {
      text: 'ADM_MENU',
      acciones: {
        lectura: ['listado'],
        escritura: ['añadir', 'eliminar', 'editar']
      }
    }
  ];

  permisos: string[] = [];

  formulario: FormGroup;
  opcionesMenu: OpcMenu[];
  cols: any[];

  opcionMenuEdit: OpcMenu;

  displayDialog: boolean = false;

  isNew: boolean;
  submitted: boolean;

  item: MenuItem = { label: this.translate.instant('menu.listado'), url: '/main/listado' };

  constructor(
    private confirmationService: ConfirmationService,
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private opcMenuService: OpcMenuService,
    private menuDataService: MenuDataService,
    public translate: TranslateService) {
    this.cargarOpcionesMenu();
  }

  ngOnInit() {

    this.layoutService.setTitulo('Tabla Opciones Menu');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.permisos = this.menuDataService.getPermisos(this.funcionalidades);


    this.cols = [
      { field: 'idOpcMenu', header: 'Id' },
      { field: 'descripcion', header: 'Texto' },
      { field: 'icono', header: 'Icono' },
      { field: 'activo', header: 'Activo' },
      { field: 'uri', header: 'URI' },
      { field: 'porDefecto', header: 'Por defecto?' },
      { field: 'idMenu', header: 'Orden' }
    ];
    this.displayDialog = false;
  }

  cargarOpcionesMenu() {
    this.opcMenuService.getList().subscribe(res => {

      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.opcionesMenu = res.restResponse;
      }
    });
  }

  cargarFormulario(opcMenu: OpcMenu) {
    this.formulario = this.fb.group({
      'descripcion': new FormControl(opcMenu.descripcion, Validators.required),
      'icono': new FormControl(opcMenu.icono, Validators.required),
      'activo': new FormControl(opcMenu.activo, Validators.required),
      'uri': new FormControl(opcMenu.uri, Validators.required),
      'porDefecto': new FormControl(opcMenu.porDefecto, Validators.required),
      'idMenu': new FormControl(opcMenu.idMenu, Validators.required),

    });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        /*   this.opcMenuService.delete(id).subscribe(res => {
             this.cargarIntervinientes();
             this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), true);
           })*/

        this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), true);
      }
    });

  }

  editar(id: number) {
    this.opcionesMenu.forEach(opc => {
      if (opc.idOpcMenu == id) {
        this.opcionMenuEdit = opc;
      }
    });
    this.cargarFormulario(this.opcionMenuEdit);
    this.isNew = false;
    this.displayDialog = true;
  }

  add() {
    this.opcionMenuEdit = new OpcMenu;
    this.cargarFormulario(this.opcionMenuEdit);
    this.isNew = true;
    this.displayDialog = true;
  }

  save() {
    this.displayDialog = false;
    if (this.isNew) {

      this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), true);

      /*this.opcMenuService.añadirOpcMenu(this.opcionMenuEdit).subscribe(res => {
        this.cargarOpcionesMenu();
        this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), true);
      })*/
    } else {
      /*this.opcMenuService.editarOpcMenu(this.opcionMenuEdit).subscribe(res => {
        this.cargarOpcionesMenu();
        this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), true);
      });*/
      this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), true);
    }
  }

  onSubmit(value: string) {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.formulario.value); }

}
