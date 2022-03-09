import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng';
import { FabricanteResponse } from '../../core/models/services/response/fabricante-response.model';
import { TarjetaModeloResponse } from '../../core/models/services/response/tarjeta-modelo.model';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';
import { FabricanteService } from '../../core/services/fabricante.service';
import { LayoutService } from '../../core/services/layout.service';
import { TablasService } from '../../core/services/tablas.service';
import { TarjetaModeloService } from '../../core/services/tarjeta-modelo.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-tarjeta-modelo',
  templateUrl: './tarjeta-modelo.component.html',
  styleUrls: ['./tarjeta-modelo.component.css']
})
export class TarjetaModeloComponent implements OnInit {

  tarjeta: boolean = true;
  tarjetas: TarjetaModeloResponse[];
  tarjetaEdit: TarjetaModeloResponse;
  fabricante: FabricanteResponse = new FabricanteResponse();
  fabricantes: FabricanteResponse[] = [];
  formulario: FormGroup;
  cols: any[];
  displayDialog: boolean = false;
  titleHeader: string = '';
  isNew: boolean;
  edit: boolean;
  cnt: any[] = [];
  item: MenuItem = { label: this.translate.instant('menu.modeloTarjeta'), url: '/main/tarjetamodelo' };

  constructor(private translate: TranslateService,
    private tarjetaModeloService: TarjetaModeloService,
    private fabricanteService: FabricanteService,
    private layoutService: LayoutService,
    private tablasService: TablasService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private capitalizado: CapitalizadoPipe) {}

  ngOnInit(): void {
    this.layoutService.setTitulo('Modelo de Tarjeta');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.cols = [
      //{ field: 'idTarjetaModelo', header: 'ID' },
      { field: 'descTarjetaModelo', header: 'Descripción' },
      { field: 'descAtr', header: 'Atr.' },
      { field: 'descMascaraAtr', header: 'Máscara Atr.' },
      { field: 'agtFabricanteDTO', subfield: 'descNombre', header: 'Fabricante' },
      { field: 'activos', header: 'Activo' }
    ];
    this.cargarTarjetaModelo();
    this.fabricanteService.getFabricanteActivo().subscribe(res => {
      this.fabricantes = res.restResponse;
      this.cnt.push({label: '', value: ''});
      for (let i=0; i< this.fabricantes.length; i++) {
        this.cnt.push( {label: this.fabricantes[i].descNombre, value: this.fabricantes[i].idFabricante});
      }
    });
  }

  cargarFormulario(tarjetaResponse: TarjetaModeloResponse, editar: boolean) {
    if (editar) {
      this.formulario = this.fb.group({
        'descTarjetaModelo': new FormControl({value: tarjetaResponse.descTarjetaModelo, disabled: editar}, Validators.required),
        'descAtr': new FormControl({value: tarjetaResponse.descAtr, disabled: editar}),
        'descMascaraAtr': new FormControl({value: tarjetaResponse.descMascaraAtr, disabled: editar}),
        'indActivo': new FormControl({value: tarjetaResponse.indActivo, disabled: editar}, Validators.required),
        'fabricante': new FormControl({disabled: editar, value: tarjetaResponse.agtFabricanteDTO.idFabricante}, Validators.required)
      });
    } else {
      this.formulario = this.fb.group({
        'descTarjetaModelo': new FormControl({value: tarjetaResponse.descTarjetaModelo, disabled: editar}, Validators.required),
        'descAtr': new FormControl({value: tarjetaResponse.descAtr, disabled: editar}),
        'descMascaraAtr': new FormControl({value: tarjetaResponse.descMascaraAtr, disabled: editar}),
        'indActivo': new FormControl({value: tarjetaResponse.indActivo, disabled: editar}, Validators.required),
        'fabricante': new FormControl({disabled: editar, value: tarjetaResponse.agtFabricanteDTO}, Validators.required)
      });
    }
    this.displayDialog = true;
  }

  cargarTarjetaModelo() {
    this.tarjetaModeloService.getListModeloTarjeta().subscribe(res => {
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
    this.tarjetaEdit.descAtr = this.formulario.controls["descAtr"].value;
    this.tarjetaEdit.descMascaraAtr = this.formulario.controls["descMascaraAtr"].value;
    this.tarjetaEdit.descTarjetaModelo = this.formulario.controls["descTarjetaModelo"].value;
    this.tarjetaEdit.indActivo = this.formulario.controls["indActivo"].value;

    if (this.isNew) {

      this.tarjetaEdit.agtFabricanteDTO = this.fabricante;

      this.tarjetaModeloService.addModeloTarjeta(this.tarjetaEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.cargarTarjetaModelo();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      this.tarjetaEdit.agtFabricanteDTO = this.fabricante;
      this.tarjetaModeloService.editarModeloTarjeta(this.tarjetaEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else {
          this.cargarTarjetaModelo();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  addTarjetaModelo() {
    this.edit = true;
    this.titleHeader = this.translate.instant('tarjeta.AniadirTarjetaModelo');
    this.tarjetaEdit = new TarjetaModeloResponse();
    this.fabricante = new FabricanteResponse();
    this.isNew = true;
    this.cargarFormulario(this.tarjetaEdit, false);
  }

  consultar(idTarjetaModelo: number) {
    this.edit = false;
    this.titleHeader = this.translate.instant('tarjeta.ConsultarTarjetaModelo');
    this.tarjetaModeloService.getModeloTarjeta(idTarjetaModelo).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idTarjetaModelo == idTarjetaModelo) {
          this.tarjetaEdit = res.restResponse;
        }
        this.isNew = false;
        this.cargarFormulario(this.tarjetaEdit, true);
      }
    });
  }

  editar(idTarjetaModelo: number) {
    this.edit = true;
    this.titleHeader = this.translate.instant('tarjeta.EditarTarjetaModelo');
    this.tarjetaModeloService.getModeloTarjeta(idTarjetaModelo).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idTarjetaModelo == idTarjetaModelo) {
          this.tarjetaEdit = res.restResponse;
        }
        this.fabricante = res.restResponse.agtFabricanteDTO;
        this.habilitarFormulario();
        this.isNew = false;
        this.cargarFormulario(this.tarjetaEdit, true);
      }
    });
  }

  delete(idTarjetaModelo: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        this.tarjetaModeloService.deleteModeloTarjeta(idTarjetaModelo).subscribe(res => {
          if (res.controlado) {
            this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
          } else if (res.restResponse == 0) {
            this.cargarTarjetaModelo();
            this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), false);
          } else {
            this.toastService.addSingle('error', '', this.translate.instant('alertas.regNoEliminado'), true);
          }
        });
      }
    });
  }

  cargarFabricante() {
    if (this.formulario.controls["fabricante"].value == '') {
      this.formulario.controls["fabricante"].setValue('');
    } else {
      this.fabricanteService.getFabricante(this.formulario.controls["fabricante"].value).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.fabricante = res.restResponse;
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
        this.tablasService.exportarExcel(buffer, "Tarjetas");
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
       this.tablasService.exportarCSV(buffer, "Tarjetas");
      }
    });
  }

  getBufferExcel(datos: any[]): any[] {
    let datosExportar = [];

    for (let i = 0; i < datos.length; i++) {
      datosExportar[i] = {};
      const fila = datos[i];
      const nueva = datosExportar[i];

      nueva.ID_TARJETA_MODELO = fila.idTarjetaModelo;
      nueva.DESCRIPCION = fila.descNombre;
      nueva.ATR = fila.descAtr;
      nueva.MASCARA_ATR = fila.descMascaraAtr;
      
      if (fila.agtFabricanteDTO != null) {
        nueva.FABRICANTE = fila.agtFabricanteDTO.descNombre;
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