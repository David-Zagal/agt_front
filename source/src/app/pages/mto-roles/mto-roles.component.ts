import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../core/services/toast.service';
import { RolResponse } from '../../core/models/services/response/rol-response.model';
import { LayoutService } from '../../core/services/layout.service';
import { MtoRolService } from '../../core/services/mto-rol.service';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-mto-roles',
  templateUrl: './mto-roles.component.html',
  styleUrls: ['./mto-roles.component.css']
})
export class MtoRolesComponent implements OnInit {

  cols: any[];
  roles: RolResponse[];

  item: MenuItem = { label: this.translate.instant('menu.roles'), url: '/main/roles' };

  constructor(
    private mtoRolService: MtoRolService,
    private toastService: ToastService,
    public translate: TranslateService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {

    this.layoutService.setTitulo('Roles');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);

    this.cargarRoles();

    this.cols = [
      { field: 'codRol', header: 'Código Rol' },
      {  field: 'descripcion', header: 'Descripción' }
    ];
  }

  cargarRoles() {
    this.mtoRolService.getList().subscribe((res) => {
      if (res.controlado === true) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.roles = res.restResponse;
      }
    });
  }

}
