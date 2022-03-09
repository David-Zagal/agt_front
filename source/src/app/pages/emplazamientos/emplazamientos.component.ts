import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng';
import { EmplazamientoResponse } from '../../core/models/services/response/emplazamiento-response.model';
import { EmplazamientosService } from '../../core/services/emplazamientos.service';
import { ToastService } from '../../core/services/toast.service';
import { TablasService } from '../../core/services/tablas.service';
import { LayoutService } from '../../core/services/layout.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@Component({
  selector: 'app-emplazamientos',
  templateUrl: './emplazamientos.component.html',
  styleUrls: ['./emplazamientos.component.css']
})
export class EmplazamientosComponent implements OnInit {

  formulario: FormGroup;
  emplazamientos: EmplazamientoResponse[];
  cols: any[];
  emplazamientosEdit: EmplazamientoResponse;
  displayDialog: boolean = false;
  isNew: boolean;
  titleHeader: string = '';
  edit: boolean;
  item: MenuItem = { label: this.translate.instant('menu.emplazamientos'), url: '/main/emplazamientos' };

  constructor(public translate: TranslateService,
    private emplazamientosService: EmplazamientosService,
    private toastService: ToastService,
    private tablasService: TablasService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private capitalizado: CapitalizadoPipe) {}

  ngOnInit(): void {
    this.layoutService.setTitulo('Emplazamientos');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.cargarEmplazamientos();
    this.cols = [
      //{ field: 'idEmplazamiento', header: 'ID' },
      { field: 'descEmplazamiento', header: 'Nombre emplazamiento' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'localidad', header: 'Localidad' },
      { field: 'cp', header: 'Código Postal' },
      { field: 'provincia', header: 'Provincia' },
      { field: 'pais', header: 'País' }
      //{ field: 'activo', header: 'Activo' }
    ];
    this.displayDialog = false;
  }

  cargarFormulario(emplazamientoResponse: EmplazamientoResponse, editar: boolean) {
    this.formulario = this.fb.group({
      'direccion': new FormControl({value: emplazamientoResponse.direccion, disabled: editar}, Validators.required),
      'descEmplazamiento': new FormControl({value: emplazamientoResponse.descEmplazamiento, disabled: editar}, Validators.required),
      'localidad': new FormControl({value: emplazamientoResponse.localidad, disabled: editar}, Validators.required),
      'pais': new FormControl({value: emplazamientoResponse.pais, disabled: editar}, Validators.required),
      'cp': new FormControl({value: emplazamientoResponse.cp, disabled: editar}),
      'provincia': new FormControl({value: emplazamientoResponse.provincia, disabled: editar}, Validators.required),
      'activo': new FormControl({value: emplazamientoResponse.activo, disabled: editar}, Validators.required),
    });
    this.displayDialog = true;
  }

  cargarEmplazamientos() {
    this.emplazamientosService.getList().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.emplazamientos = res.restResponse;
      }
    });
  }

  save() {
    this.displayDialog = false;
    this.emplazamientosEdit.direccion = this.capitalizado.transform(this.formulario.controls["direccion"].value);
    this.emplazamientosEdit.descEmplazamiento = this.capitalizado.transform(this.formulario.controls["descEmplazamiento"].value);
    this.emplazamientosEdit.localidad = this.capitalizado.transform(this.formulario.controls["localidad"].value);
    this.emplazamientosEdit.pais = this.capitalizado.transform(this.formulario.controls["pais"].value);
    this.emplazamientosEdit.cp = this.formulario.controls["cp"].value;
    this.emplazamientosEdit.provincia = this.capitalizado.transform(this.formulario.controls["provincia"].value);
    this.emplazamientosEdit.activo = this.formulario.controls["activo"].value;

    if (this.isNew) {

      this.emplazamientosService.addEmplazamiento(this.emplazamientosEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.cargarEmplazamientos();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      this.emplazamientosService.editEmplazmiento(this.emplazamientosEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else {
          this.cargarEmplazamientos();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  add() {
    this.edit = true;
    this.titleHeader = this.translate.instant('emplazamiento.AniadirEmplazamiento');
    this.emplazamientosEdit = new EmplazamientoResponse();
    this.isNew = true;
    this.cargarFormulario(this.emplazamientosEdit, false);
  }

  consultar(idEmplazamiento: number) {
    this.edit = false;
    this.titleHeader = this.translate.instant('emplazamiento.DetalleEmplazamiento');
    this.emplazamientosService.getEmplazamiento(idEmplazamiento).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idEmplazamiento == idEmplazamiento) {
          this.emplazamientosEdit = res.restResponse;
        }
        this.isNew = false;
        this.cargarFormulario(this.emplazamientosEdit, true);
      }
    });
  }

  editar(idEmplazamiento: number) {
    this.edit = true;
    this.titleHeader = this.translate.instant('emplazamiento.EditarEmplazamiento');
    this.emplazamientosService.getEmplazamiento(idEmplazamiento).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idEmplazamiento == idEmplazamiento) {
          this.emplazamientosEdit = res.restResponse;
        }
        this.isNew = false;
        this.cargarFormulario(this.emplazamientosEdit, false);
      }
    });
  }

  delete(idEmplazamiento: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        this.emplazamientosService.deleteEmplazamiento(idEmplazamiento).subscribe(res => {
          if (res.controlado) {
            this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
          } else if (res.restResponse == 0) {
            this.cargarEmplazamientos();
            this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), false);
          } else {
            this.toastService.addSingle('error', '', this.translate.instant('alertas.regNoEliminado'), true);
          }
        });
      }
    });
  }

  isNumberKey(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
      return true;
    }
  }

  exportarExcelEmplazamientos() {
    let datos = this.emplazamientos;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato Microsoft Excel?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
        this.tablasService.exportarExcel(buffer, "Emplazamientos");
      }
    });
  }

  exportarCsvEmplazamientos() {
    let datos = this.emplazamientos;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato CSV?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
       this.tablasService.exportarCSV(buffer, "Emplazamientos");
      }
    });
  }

  getBufferExcel(datos: any[]): any[] {
    let datosExportar = [];

    for (let i = 0; i < datos.length; i++) {
      datosExportar[i] = {};
      const fila = datos[i];
      const nueva = datosExportar[i];

      nueva.ID_EMPLAZAMIENTO = fila.idEmplazamiento;
      nueva.DESCRIPCION_EMPLAZAMIENTO = fila.descEmplazamiento;
      nueva.DIRECCION = fila.direccion;
      nueva.CODIGO_POSTAL = fila.cp;
      nueva.LOCALIDAD = fila.localidad;
      nueva.PROVINCIA = fila.provincia;
      nueva.PAIS = fila.pais;
      if (fila.activo == 0) {
        nueva.ACTIVO = 'NO';
      } else {
        nueva.ACTIVO = 'SI';
      }
    }
    return datosExportar;
  }
}