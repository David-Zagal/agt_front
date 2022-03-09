import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng';
import { IdentificacionResponse } from '../../core/models/services/response/identificacion-response.model';
import { IdentificacionService } from '../../core/services/identificacion.service';
import { ToastService } from '../../core/services/toast.service';
import { TablasService } from '../../core/services/tablas.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  formulario: FormGroup;
  identificacion: boolean = true;
  identificacionEdit: IdentificacionResponse;
  item: MenuItem = { label: this.translate.instant('menu.identificacion'), url: '/main/identificacion' };
  es: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  fecHoy: Date;
  tipoDocumento: { label: string; value: string; }[];

  constructor(public translate: TranslateService,
    private identificacionService: IdentificacionService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private tablasService: TablasService,
    private datePipe: DatePipe) {
      this.es = this.tablasService.es;
      this.fecHoy = new Date();
  }

  ngOnInit(): void {
    this.layoutService.setTitulo('Identificacion');
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);
    this.identificacionEdit = new IdentificacionResponse();
    this.tipoDocumento = [
      { label: 'Seleccione un Tipo', value: null },
      { label: 'NIF', value: 'DNI' },
      { label: 'NIE', value: 'NIE' }
    ];
    this.cargarFormulario(this.identificacionEdit);
  }

  cargarFormulario(identificacionResponse: IdentificacionResponse) {
    this.formulario = this.fb.group({
      'tipoDoc': new FormControl('', Validators.required),
      'numDoc': new FormControl('', Validators.required),
      'nombre': new FormControl('', [Validators.required, Validators.pattern('^$|^[a-zA-Z \u00C0-\u00FF\'-]*$'),]),
      'primerApellido': new FormControl('', [Validators.required, Validators.pattern('^$|^[a-zA-Z \u00C0-\u00FF\'-]*$'),]),
      'segundoApellido': new FormControl('', Validators.pattern('^$|^[a-zA-Z \u00C0-\u00FF\'-]*$')),
      'fechaNacimiento': new FormControl('', Validators.required)
    });

    this.formulario.get("tipoDoc").valueChanges.subscribe(idType => {
      this.validarNuevoSolicitante();
    });

    this.formulario.get("numDoc").valueChanges.subscribe(idNum => {
      this.validarNuevoSolicitante();
    });
  }

  validarNuevoSolicitante() {
    this.formulario.controls['numDoc'].setErrors(null);
    if (this.formulario.controls['tipoDoc'].value === 'DNI') {
      this.formulario.controls['numDoc'].clearValidators();
      this.formulario.controls['numDoc'].setValidators([Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]);
      if (this.formulario.controls['numDoc'].value) {
        const dni = this.formulario.controls['numDoc'].value;
        let numero = dni.substr(0, dni.length - 1);
        const letraDni = dni.substr(dni.length - 1, 1);
        numero %= 23;
        let comprobacion = 'TRWAGMYFPDXBNJZSQVHLCKET';
        comprobacion = comprobacion.substring(numero, numero + 1);
        if (comprobacion != letraDni.toUpperCase()) {
          this.formulario.controls['numDoc'].setErrors({ 'incorrect': true });
        }
      } else {
        this.formulario.controls['numDoc'].setErrors({ 'incorrect': true });
      }
    } else if (this.formulario.controls['tipoDoc'].value === 'NIE') {
      this.formulario.controls['numDoc'].clearValidators();
      this.formulario.controls['numDoc'].setValidators([Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i)]);
      let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
      let nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      if (this.formulario.controls['numDoc'].value) {
        let str = this.formulario.controls['numDoc'].value.toString().toUpperCase();
        if (!nieRexp.test(str)) {
          this.formulario.controls['numDoc'].setErrors({ 'incorrect': true });
        }
        let nie = str
          .replace(/^[X]/, '0')
          .replace(/^[Y]/, '1')
          .replace(/^[Z]/, '2');
        let letter = str.substr(-1);
        let charIndex = parseInt(nie.substr(0, 8)) % 23;
        if (validChars.charAt(charIndex) === letter) {
          return true;
        }
      } else {
        this.formulario.controls['numDoc'].setErrors({ 'incorrect': true });
      }
    }
  }

  enviar() {
    this.identificacionEdit.tipoDoc = this.formulario.controls["tipoDoc"].value;
    let aux =  this.formulario.controls["numDoc"].value;
    if ((this.formulario.controls['numDoc'].value === 'DNI') && (aux.length < 9)) {
      aux = aux.padStart(9, "0");
      this.identificacionEdit.numDoc = aux;
    } else {
      this.identificacionEdit.numDoc = this.formulario.controls["numDoc"].value;
    }
    this.identificacionEdit.nombre = this.formulario.controls["nombre"].value;
    this.identificacionEdit.primerApellido = this.formulario.controls["primerApellido"].value;
    this.identificacionEdit.segundoApellido = this.formulario.controls["segundoApellido"].value;
    
    let fecha = (this.formulario.get('fechaNacimiento').value).toString();
    this.identificacionEdit.fechaNacimiento = this.datePipe.transform(this.formulario.get('fechaNacimiento').value, 'yyyyMMdd');
    
    this.identificacionService.enviarIdentificacion(this.identificacionEdit).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingleIden('error', 'Error de aplicación', res.descripcion, true, 'myToast');
      } else if (res.restResponse.detalle === null) {
        this.toastService.addSingleIden('error', 'Error en la llamada al servicio de consulta de identidad', res.descripcion, true, 'myToast');
      } else if (res.restResponse.codigo === '00') {
        this.toastService.addSingleIden('success', '', res.restResponse.detalle, false, 'myToast');
        this.deshabilitarFormulario();
      } else {
        this.toastService.addSingleIden('error', '', res.restResponse.detalle, true, 'myToast');
      }
    });
  }

  deshabilitarFormulario() {
    this.formulario.disable();
  }

  habilitarFormulario() {
    this.formulario.enable();
  }

  limpiar() {
    this.formulario.reset();
    this.habilitarFormulario();
  }
}