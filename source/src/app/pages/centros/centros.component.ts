import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng';
import { ToastService } from '../../core/services/toast.service';
import { CentroResponse } from '../../core/models/services/response/centro-response.model';
import { CentrosService } from '../../core/services/centros.service';
import { TablasService } from '../../core/services/tablas.service';
import { LayoutService } from '../../core/services/layout.service';
import { EmplazamientoResponse } from '../../core/models/services/response/emplazamiento-response.model';
import { EmplazamientosService } from '../../core/services/emplazamientos.service';
import { CapitalizadoPipe } from '../../core/pipes/capitalizado.pipe';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  formulario: FormGroup;
  centros: CentroResponse[];
  centroEdit: CentroResponse = new CentroResponse();
  emplazamientos: EmplazamientoResponse[] = [];
  emplaza: EmplazamientoResponse = new EmplazamientoResponse();
  cols: any[];
  cnt: any[] = [];
  displayDialog: boolean = false;
  isNew: boolean;
  titleHeader: string = '';
  localidad: string = '';
  activo: string[] = [];
  tipoCentro: any;
  item: MenuItem = { label: this.translate.instant('menu.centros'), url: '/main/centros' };
  
  constructor(public translate: TranslateService,
    private centrosService: CentrosService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private tablasService: TablasService,
    private layoutService: LayoutService,
    private emplService: EmplazamientosService,
    private capitalizado: CapitalizadoPipe) {}

  ngOnInit(): void {
    this.layoutService.setTitulo(this.item.label);
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.cargarCentros();
    // Esto es prueba para mejorar la traducción que no se hace al instante
    /*this.translateService.get('hello.world').subscribe((translated: string) => {
      console.log(res);
      //=> 'Hello world'
      // You can call instant() here
      const translation = this.translateService.instant('something.else');
      //=> 'Something else'
    });*/
    this.cols = [
      //{ field: 'idCentro', header: 'ID' },
      //{ field: 'descCentro', header: 'Nombre del centro' },
      { field: 'descCentro', header: this.translate.instant('centro.NombreCentro') },
      { field: 'agtEmplazamientoDTO', subfield: 'localidad', header: 'Localidad' },
      { field: 'telefono', header: 'Teléfono' },
      //{ field: 'idEmplazamiento', header: 'ID Empl.' },
      { field: 'activos', header: 'Activo' },
      { field: 'tipoCentro', header: 'Tipo de centro' }
    ];
    this.emplService.getEmplazamientoActivo().subscribe(res => {
      this.emplazamientos = res.restResponse;
      this.cnt.push({label: '', value: ''});
      for (let i=0; i< this.emplazamientos.length; i++) {
        this.cnt.push( {label: this.emplazamientos[i].descEmplazamiento, value: this.emplazamientos[i].idEmplazamiento});
      }
    });
  }

  cargarFormulario(centroResponse: CentroResponse, editar: boolean) {
    if (editar) {
      this.formulario = this.fb.group({
        'descCentro': new FormControl({value: centroResponse.descCentro, disabled: false}, Validators.required),
        'telefono': new FormControl({value: centroResponse.telefono, disabled: false}),
        'activo': new FormControl({value: centroResponse.activo, disabled: false}, Validators.required),
        'tipoCentro': new FormControl(centroResponse.tipoCentro, Validators.required),
        'emplazamiento': new FormControl(centroResponse.agtEmplazamientoDTO.idEmplazamiento, Validators.required),
        'localidad': new FormControl({value: centroResponse.agtEmplazamientoDTO.localidad, disabled: editar}),
        'cp': new FormControl({value: centroResponse.agtEmplazamientoDTO.cp, disabled: editar}),
        'provincia': new FormControl({value: centroResponse.agtEmplazamientoDTO.provincia, disabled: editar}),
        'pais': new FormControl({value: centroResponse.agtEmplazamientoDTO.pais, disabled: editar}),
        'direccion': new FormControl({value: centroResponse.agtEmplazamientoDTO.direccion, disabled: editar})
      });
    } else {
      this.formulario = this.fb.group({
        'descCentro': new FormControl({value: centroResponse.descCentro, disabled: editar}, Validators.required),
        'telefono': new FormControl({value: centroResponse.telefono, disabled: editar}),
        'activo': new FormControl({value: centroResponse.activo, disabled: editar}, Validators.required),
        'tipoCentro': new FormControl(centroResponse.tipoCentro, Validators.required),
        'emplazamiento': new FormControl(centroResponse.agtEmplazamientoDTO, Validators.required),
        'localidad': new FormControl({value: '', disabled: true}, Validators.required),
        'cp': new FormControl({value: '', disabled: true}, Validators.required),
        'provincia': new FormControl({value: '', disabled: true}, Validators.required),
        'pais': new FormControl({value: '', disabled: true}, Validators.required),
        'direccion': new FormControl({value: '', disabled: true}, Validators.required),
      });
    }
    this.displayDialog = true;
  }

  cargarCentros() {
    this.centrosService.getList().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        for (let i=0; i < res.restResponse.length; i++) {
          res.restResponse[i].activos = this.formatearSiNo(res.restResponse[i].activo);
        }
        this.centros = res.restResponse;
      }
    });
  }

  save() {
    this.displayDialog = false;
    this.centroEdit.descCentro = this.capitalizado.transform(this.formulario.controls["descCentro"].value);
    this.centroEdit.telefono = this.formulario.controls["telefono"].value;
    this.centroEdit.activo = this.formulario.controls["activo"].value;
    this.centroEdit.tipoCentro = this.formulario.controls["tipoCentro"].value;
    
    if (this.isNew) {
      this.emplService.getEmplazamiento(this.formulario.controls["emplazamiento"].value).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        }
        if(res.restResponse) {
          this.emplaza = res.restResponse;
        }
      });
      this.centroEdit.agtEmplazamientoDTO = this.emplaza;
      
      this.centrosService.addCentro(this.centroEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.cargarCentros();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      this.centroEdit.agtEmplazamientoDTO = this.emplaza;
      this.centrosService.editCentro(this.centroEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else {
          this.cargarCentros();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  addCentro() {
    this.centroEdit = new CentroResponse();
    this.titleHeader = this.translate.instant('centro.AniadirCentro');
    this.emplaza = new EmplazamientoResponse();
    this.isNew = true;
    this.displayDialog = true;
    this.cargarFormulario(this.centroEdit, false);
  }

  editar(idCentro: number) {
    this.titleHeader = this.translate.instant('centro.EditarCentro');
    this.centrosService.getCentro(idCentro).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.idCentro == idCentro) {
          this.centroEdit = res.restResponse;
        }
        this.emplaza = res.restResponse.agtEmplazamientoDTO;
        this.isNew = false;
        this.displayDialog = true;
        this.cargarFormulario(this.centroEdit, true);
      }
    });
  }

  delete(idCentro: number) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        this.centrosService.deleteCentro(idCentro).subscribe(res => {
          this.cargarCentros();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), false);
        });
      }
    });
  }

  cargarEmplazamiento() {
    if (this.formulario.controls["emplazamiento"].value == '') {
      this.limpiarCampos();
    } else {
      this.emplService.getEmplazamiento(this.formulario.controls["emplazamiento"].value).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if(res.restResponse) {
          this.emplaza = res.restResponse;
        }
      });
    }
  }

  limpiarCampos() {
    this.formulario.controls["localidad"].setValue('');
    this.formulario.controls["cp"].setValue('');
    this.formulario.controls["provincia"].setValue('');
    this.formulario.controls["pais"].setValue('');
    this.formulario.controls["direccion"].setValue('');
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

  exportarExcelCentros() {
    let datos = this.centros;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato Microsoft Excel?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
        this.tablasService.exportarExcel(buffer, "Centros");
      }
    });
  }

  exportarCsvCentros() {
    let datos = this.centros;
    let buffer = this.getBufferExcel(datos);
    let mensage = '¿Exportar datos en formato CSV?';
    this.confirmationService.confirm({
      header: this.translate.instant('alertas.alertaAviso'),
      icon: 'pi pi-exclamation-triangle',
      message: mensage,
      accept: () => {
       this.tablasService.exportarCSV(buffer, "Centros");
      }
    });
  }
  
  getBufferExcel(datos: any[]): any[] {
    let datosExportar = [];

    for (let i = 0; i < datos.length; i++) {
      datosExportar[i] = {};
      const fila = datos[i];
      const nueva = datosExportar[i];

      nueva.CENTRO_ID = fila.idCentro;
      nueva.DESCRIPCION_CENTRO = fila.descCentro;
      nueva.TELEFONO = fila.telefono;
      nueva.TIPO_CENTRO = fila.tipoCentro;
      
      if (fila.activo == 0) {
        nueva.ACTIVO = 'NO';
      } else {
        nueva.ACTIVO = 'SI';
      }

      if (fila.agtEmplazamientoDTO != null) {
        nueva.EMPLAZAMIENTO = fila.agtEmplazamientoDTO.descEmplazamiento;
        nueva.LOCALIDAD = fila.agtEmplazamientoDTO.localidad;
      }
    }
    return datosExportar;
  }
}