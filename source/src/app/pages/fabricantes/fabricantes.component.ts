import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService,MenuItem } from 'primeng';
import { TablasService } from '../../core/services/tablas.service';
import { FabricanteResponse } from '../../core/models/services/response/fabricante-response.model';
import { FabricanteService } from '../../core/services/fabricante.service';
import { LayoutService } from '../../core/services/layout.service';
import { ToastService } from '../../core/services/toast.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.css']
})
export class FabricantesComponent implements OnInit {
  
  formulario: FormGroup;
  fabricantes: FabricanteResponse[];
  cols: any[];
  displayDialog: boolean = false;
  fabricanteEdit: FabricanteResponse;
  isNew: boolean;
  titleHeader: string = '';
  edit: boolean;
  item: MenuItem = { label: this.translate.instant('menu.fabricante'), url: '/main/fabricante' };
  
  constructor(public translate: TranslateService, private layoutService: LayoutService,
    private fabricanteService: FabricanteService,
    private tablasService: TablasService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private capitalizado: CapitalizadoPipe) {}

  ngOnInit(): void {
    this.layoutService.setTitulo('Fabricantes');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.cargarFabricantes();
    this.cols = [
      //{ field: 'idFabricante', header: 'ID' },
      { field: 'descNombre', header: 'Nombre' },
      { field: 'descDireccion', header: 'Dirección' },
      { field: 'descLocalidad', header: 'Localidad' },
      { field: 'descCp', header: 'Código Postal' },
      //{ field: 'descFichero', header: 'Nombre fichero' },
      { field: 'descMail', header: 'Mail' },
      //{ field: 'descPais', header: 'País' },
      //{ field: 'descProveedor', header: 'Proveedor' },
      { field: 'descTelefono', header: 'Teléfono' },
      { field: 'activos', header: 'Activo' }
    ];
    this.displayDialog = false;
  }
  
  cargarFormulario(fabricanteResponse: FabricanteResponse, editar: boolean) {
    this.formulario = this.fb.group({
      'descNombre': new FormControl({value: fabricanteResponse.descNombre, disabled: editar}, Validators.required),
      'descDireccion': new FormControl({value: fabricanteResponse.descDireccion, disabled: editar}),
      'descLocalidad': new FormControl({value: fabricanteResponse.descLocalidad, disabled: editar}),
      'descCp': new FormControl({value: fabricanteResponse.descCp, disabled: editar}),
      'descMail': new FormControl({value: fabricanteResponse.descMail, disabled: editar}, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)),
      'descPais': new FormControl({value: fabricanteResponse.descPais, disabled: editar}),
      'descProveedor': new FormControl({value: fabricanteResponse.descProveedor, disabled: editar}),
      'descTelefono': new FormControl({value: fabricanteResponse.descTelefono, disabled: editar}, Validators.pattern(/^([0-9])*$/)),
      'descFichero': new FormControl({value: fabricanteResponse.descFichero, disabled: editar}),
      'indActivo': new FormControl({value: fabricanteResponse.indActivo, disabled: editar})
    });
    this.displayDialog = true;
  }

  cargarFabricantes() {
    this.fabricanteService.getListFabricante().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        for (let i=0; i < res.restResponse.length; i++) {
          res.restResponse[i].activos = this.formatearSiNo(res.restResponse[i].indActivo);
        }
        this.fabricantes = res.restResponse;
      }
    });
  }

  save() {
    this.displayDialog = false;
    if (this.formulario.controls["descNombre"].value != null) {
      this.fabricanteEdit.descNombre = this.capitalizado.transform(this.formulario.controls["descNombre"].value);
    }
    if (this.formulario.controls["descDireccion"].value != null) {
      this.fabricanteEdit.descDireccion = this.capitalizado.transform(this.formulario.controls["descDireccion"].value);
    }
    if (this.formulario.controls["descLocalidad"].value != null) {
      this.fabricanteEdit.descLocalidad = this.capitalizado.transform(this.formulario.controls["descLocalidad"].value);
    }
    if (this.formulario.controls["descPais"].value != null) {
      this.fabricanteEdit.descPais = this.capitalizado.transform(this.formulario.controls["descPais"].value);
    }
    if (this.formulario.controls["descProveedor"].value != null) {
      this.fabricanteEdit.descProveedor = this.capitalizado.transform(this.formulario.controls["descProveedor"].value);
    }
    
    this.fabricanteEdit.descCp = this.formulario.controls["descCp"].value;
    this.fabricanteEdit.descTelefono = this.formulario.controls["descTelefono"].value;
    this.fabricanteEdit.descMail = this.formulario.controls["descMail"].value;
    this.fabricanteEdit.descFichero = this.formulario.controls["descFichero"].value;
    this.fabricanteEdit.indActivo = this.formulario.controls["indActivo"].value;

    if (this.isNew) {

      this.fabricanteService.addFabricante(this.fabricanteEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.cargarFabricantes();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      this.fabricanteService.editFabricante(this.fabricanteEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else {
          this.cargarFabricantes();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  addFabricante() {
    this.edit = true;
    this.fabricanteEdit = new FabricanteResponse();
    this.titleHeader = this.translate.instant('fabricante.AniadirFabricante');
    this.isNew = true;
    this.displayDialog = true;
    this.cargarFormulario(this.fabricanteEdit, false);
  }

  consultar(idFabricante: number) {
    this.edit = false;
    this.titleHeader = this.translate.instant('fabricante.ConsultarFabricante');
    this.fabricantes.forEach(fabricante => {
      if (fabricante.idFabricante == idFabricante) {
        this.fabricanteEdit = fabricante;
      }
    });
    this.isNew = false;
    this.displayDialog = true;
    this.cargarFormulario(this.fabricanteEdit, true);
  }

  editar(idFabricante: number) {
    this.edit = true;
    this.titleHeader = this.translate.instant('fabricante.EditarFabricante');
    this.fabricantes.forEach(fabricante => {
      if (fabricante.idFabricante == idFabricante) {
        this.fabricanteEdit = fabricante;
      }
    });
    this.isNew = false;
    this.displayDialog = true;
    this.cargarFormulario(this.fabricanteEdit, false);
  }

  delete(idFabricante: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        this.fabricanteService.deleteFabricante(idFabricante).subscribe(res => {
          if (res.controlado) {
            this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
          } else if (res.restResponse == 0) {
            this.cargarFabricantes();
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

  formatearSiNo(value: number): string {
    if (value === 1) {
      return 'Si';
    } else if (value === 0) {
      return 'No';
    } else if (value === null || value == undefined) {
      return '';
    }
    return value.toString();
  }

  exportarExcelFabricantes() {
    let datos = this.fabricantes;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato Microsoft Excel?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
        this.tablasService.exportarExcel(buffer, "Fabricantes");
      }
    });
  }

  exportarCsvFabricantes() {
    let datos = this.fabricantes;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato CSV?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
       this.tablasService.exportarCSV(buffer, "Fabricantes");
      }
    });
  }

  getBufferExcel(datos: any[]): any[] {
    let datosExportar = [];

    for (let i = 0; i < datos.length; i++) {
      datosExportar[i] = {};
      const fila = datos[i];
      const nueva = datosExportar[i];

      nueva.ID_FABRICANTE = fila.idFabricante;
      nueva.DIRECCION = fila.descDireccion;
      nueva.LOCALIDAD = fila.descLocalidad;
      nueva.CODIGO_POSTAL = fila.descCp;
      nueva.PAIS = fila.descPais;
      nueva.PROVEEDOR = fila.descProveedor;
      nueva.EMAIL = fila.descMail;
      nueva.TELEFONO = fila.descTelefono;
      if (fila.indActivo == 0) {
        nueva.ACTIVO = 'NO';
      } else {
        nueva.ACTIVO = 'SI';
      }
    }
    return datosExportar;
  }
}