import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng';
import { TarjetaModeloResponse } from '../../core/models/services/response/tarjeta-modelo.model';
import { TarjetaTipoResponse } from '../../core/models/services/response/tarjeta-tipo-model';
import { LayoutService } from '../../core/services/layout.service';
import { TablasService } from '../../core/services/tablas.service';
import { TarjetaModeloService } from '../../core/services/tarjeta-modelo.service';
import { TarjetaTipoService } from '../../core/services/tarjeta-tipo.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-tarjeta-tipo',
  templateUrl: './tarjeta-tipo.component.html',
  styleUrls: ['./tarjeta-tipo.component.css']
})
export class TarjetaTipoComponent implements OnInit {

  tarjeta: boolean = true;
  tarjetas: TarjetaTipoResponse[];
  tarjetaEdit: TarjetaTipoResponse = new TarjetaTipoResponse();;
  tarjetaModelo: TarjetaModeloResponse[] = [];
  tarjetaModel: TarjetaModeloResponse = new TarjetaModeloResponse();
  formulario: FormGroup;
  cols: any[];
  displayDialog: boolean = false;
  titleHeader: string = '';
  edit: boolean;
  isNew: boolean;
  cnt: any[] = [];
  item: MenuItem = { label: this.translate.instant('menu.tipoTarjeta'), url: '/main/tarjetatipo' };

  constructor(private translate: TranslateService,
    private tarjetaTipoService: TarjetaTipoService,
    private tarjetaModeloService: TarjetaModeloService,
    private layoutService: LayoutService,
    private tablasService: TablasService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private toastService: ToastService,) {}

  ngOnInit(): void {
    this.layoutService.setTitulo('Tipo de Tarjeta');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.cols = [
      //{ field: 'idTarjetaTipo', header: 'ID' },
      { field: 'descPersonalizacion', header: 'Personalización' },
      { field: 'descTarjetaTipo', header: 'Tipo de Tarjeta' },
      { field: 'activos', header: 'Activo' },
      { field: 'agtTarjetaModeloDTO', subfield: 'descTarjetaModelo', header: 'Modelo de Tarjeta' },
    ];
    this.cargarTarjetaTipo();
    this.tarjetaModeloService.getTarjetaModeloActivo().subscribe(res => {
      this.tarjetaModelo = res.restResponse;
      this.cnt.push({label: '', value: ''});
      for (let i=0; i< this.tarjetaModelo.length; i++) {
        this.cnt.push( {label: this.tarjetaModelo[i].descTarjetaModelo, value: this.tarjetaModelo[i].idTarjetaModelo});
      }});
  }

  cargarFormulario(tarjetaResponse: TarjetaTipoResponse, editar: boolean) {
    if (editar) {
      this.formulario = this.fb.group({
        'descPersonalizacion': new FormControl({value: tarjetaResponse.descPersonalizacion, disabled: editar}, Validators.required),
        'descTarjetaTipo': new FormControl({value: tarjetaResponse.descTarjetaTipo, disabled: editar}),
        'indActivo': new FormControl({value: tarjetaResponse.indActivo, disabled: editar}, Validators.required),
        'agtTarjetaModeloDTO': new FormControl({disabled: editar, value: tarjetaResponse.agtTarjetaModeloDTO.idTarjetaModelo}, Validators.required)
      });
    } else {
      this.formulario = this.fb.group({
        'descPersonalizacion': new FormControl({value: tarjetaResponse.descPersonalizacion, disabled: editar}, Validators.required),
        'descTarjetaTipo': new FormControl({value: tarjetaResponse.descTarjetaTipo, disabled: editar}),
        'indActivo': new FormControl({value: tarjetaResponse.indActivo, disabled: editar}, Validators.required),
        'agtTarjetaModeloDTO': new FormControl(tarjetaResponse.agtTarjetaModeloDTO, Validators.required)
      });
    }
    this.displayDialog = true;
  }

  cargarTarjetaTipo() {
    this.tarjetaTipoService.getListTipoTarjeta().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        for (let i=0; i < res.restResponse.length; i++) {
          res.restResponse[i].activos = this.formatearSiNo(res.restResponse[i].indActivo);
        }
        this.tarjetas = res.restResponse;
      }
    });
  }

  save() {
    this.displayDialog = false;
    this.tarjetaEdit.descPersonalizacion = this.formulario.controls["descPersonalizacion"].value;
    this.tarjetaEdit.descTarjetaTipo = this.formulario.controls["descTarjetaTipo"].value;
    this.tarjetaEdit.indActivo = this.formulario.controls["indActivo"].value;

    if (this.isNew) {
      this.tarjetaEdit.agtTarjetaModeloDTO = this.tarjetaModel;
      this.tarjetaTipoService.addTipoTarjeta(this.tarjetaEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.cargarTarjetaTipo();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      this.tarjetaEdit.agtTarjetaModeloDTO = this.tarjetaModel;
      this.tarjetaTipoService.editarTipoTarjeta(this.tarjetaEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else {
          this.cargarTarjetaTipo();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  addTipoTarjeta() {
    this.edit = true;
    this.titleHeader = this.translate.instant('tarjetaTipo.AniadirTarjetaTipo');
    this.tarjetaEdit = new TarjetaTipoResponse();
    this.tarjetaModel = new TarjetaModeloResponse();
    this.isNew = true;
    this.cargarFormulario(this.tarjetaEdit, false);
  }

  consultar(idTarjetaTipo: number) {
    this.edit = false;
    this.titleHeader = this.translate.instant('tarjetaTipo.ConsultarTarjetaTipo');
    this.tarjetaTipoService.getTipoTarjeta(idTarjetaTipo).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idTarjetaTipo == idTarjetaTipo) {
          this.tarjetaEdit = res.restResponse;
        }
        this.isNew = false;
        this.cargarFormulario(this.tarjetaEdit, true);
      }
    });
  }

  editar(idTarjetaTipo: number) {
    this.edit = true;
    this.titleHeader = this.translate.instant('tarjetaTipo.EditarTarjetaTipo');
    this.tarjetaTipoService.getTipoTarjeta(idTarjetaTipo).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idTarjetaTipo == idTarjetaTipo) {
          this.tarjetaEdit = res.restResponse;
        }
        this.tarjetaModel = res.restResponse.agtTarjetaModeloDTO;
        this.isNew = false;
        this.habilitarFormulario();
        this.cargarFormulario(this.tarjetaEdit, true);
      }
    });
  }
 
  delete(idTarjetaTipo: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'), 
      accept: () => {
        this.tarjetaTipoService.deleteTipoTarjeta(idTarjetaTipo).subscribe(res => {
          if (res.controlado) {
            this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
          } else if (res.restResponse == 0) {
            this.cargarTarjetaTipo();
            this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), false);
          } else {
            this.toastService.addSingle('error', '', this.translate.instant('alertas.regNoEliminado'), true);
          }
        });
      }
    });
  }

  cargarTarjetaModelo() {
    if (this.formulario.controls["agtTarjetaModeloDTO"].value == '') {
      this.formulario.controls["agtTarjetaModeloDTO"].setValue('');
    } else {
      this.tarjetaModeloService.getModeloTarjeta(this.formulario.controls["agtTarjetaModeloDTO"].value).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if (res.restResponse) {
          this.tarjetaModel = res.restResponse;
        }
      });
    }
  }

  habilitarFormulario() {
    this.formulario.enable();
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

  exportarExcelTarjetas() {
    let datos = this.tarjetas;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato Microsoft Excel?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
        this.tablasService.exportarExcel(buffer, "TipoTarjetas");
      }
    });
  }

  exportarCsvTarjetas() {
    let datos = this.tarjetas;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato CSV?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
       this.tablasService.exportarCSV(buffer, "TipoTarjetas");
      }
    });
  }

  getBufferExcel(datos: any[]): any[] {
    let datosExportar = [];

    for (let i = 0; i < datos.length; i++) {
      datosExportar[i] = {};
      const fila = datos[i];
      const nueva = datosExportar[i];

      nueva.ID_TARJETA_TIPO = fila.idTarjetaTipo;
      nueva.PERSONALIZACION = fila.descPersonalizacion;
      nueva.TARJETA_TIPO = fila.descTarjetaTipo;
      
      if (fila.agtTarjetaModeloDTO != null) {
        nueva.MODELO_TARJETA = fila.agtTarjetaModeloDTO.descTarjetaModelo;
      }

      if (fila.indActivo == 0) {
        nueva.ACTIVO = 'NO';
      } else {
        nueva.ACTIVO = 'SI';
      }
    }
    return datosExportar;
  }
}