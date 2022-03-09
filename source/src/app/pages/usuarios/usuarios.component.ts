import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem} from 'primeng';
import { ToastService } from '../../core/services/toast.service';
import { LayoutService } from '../../core/services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { UserResponse } from '../../core/models/services/response/user-response.model';
import { MtoUsuarioService } from '../../core/services/mto-usuario.service';
import { RolResponse } from '../../core/models/services/response/rol-response.model';
import { CentrosService } from '../../core/services/centros.service';
import { CentroResponse } from '../../core/models/services/response/centro-response.model';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 
  permisos: string[] = [];

  formulario: FormGroup;
  usuarios: UserResponse[]; // Datos tabla usuarios
  usuariosEdit: UserResponse = new UserResponse(); // datos del usuario
  roles: RolResponse[] = []; // los roles recuperados de BBDD
  centros: CentroResponse[] = [];
  centross: CentroResponse[] = [];
  centrosEdit: CentroResponse[] = []; // los centros recuperados de BBDD
  centroCptemd: any[] = [];
  centroPgtemd: any[] = [];
  
  rolesSelecionados: RolResponse[];
  arrayCodRolesSeleccionados: string[] = [];

  isNew: boolean;
  submitted: boolean;
  edit: boolean;
  lupa: boolean;
  cols: any[];
  rolesOptions: any[] = []; // las opciones que se muestran en el multiselect de roles
  titleUserHeader: string = '';
  displayDialog: boolean = false;

  item: MenuItem = { label: this.translate.instant('menu.usuarios'), url: '/main/usuarios' };

  constructor(
    private confirmationService: ConfirmationService,
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private mtoUsuarioService: MtoUsuarioService,
    public translate: TranslateService,
    private centrosService: CentrosService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.layoutService.setTitulo(this.item.label);
    this.layoutService.deleteItems();
    this.layoutService.setItems(this.item);

    this.cols = [
      { field: 'codUsuario', header: 'Código usuario' },
      { field: 'dni', header: 'Documento' },
      { field: 'nombreUsuario', header: 'Nombre' },
      { field: 'primerApellido', header: 'Primer apellido' },
      { field: 'segundoApellido', header: 'Segundo apellido' }
    ];
    this.displayDialog = false;

    this.rolesSelecionados = []; //inicializamos el modelo de los roles seleccionados
    
    this.mtoUsuarioService.getListRoles().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.roles = res.restResponse;
        for (let i=0; i < this.roles.length; i++) {
          this.rolesOptions.push({label: this.roles[i].descripcion, value: { id: this.roles[i].id, codRol: this.roles[i].codRol, descripcion: this.roles[i].descripcion}});
        }
      }
    });

    this.centrosService.getList().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.centros = res.restResponse;
        this.centroCptemd.push({label: '', value: ''});
        this.centroPgtemd.push({label: '', value: ''});
        //se recorren todos los centros obtenidos y se repoarten en los combos correspondientes
        for (let i=0; i < this.centros.length; i++) {
          if (this.centros[i].tipoCentro === "CPTEMD") {
            this.centroCptemd.push({label: this.centros[i].descCentro, value: this.centros[i].idCentro, tipo: this.centros[i].tipoCentro});//, id: { idCentro: this.centros[i].idCentro, telefono: this.centros[i].telefono, tipoCentro: this.centros[i].tipoCentro, activo: this.centros[i].activo }});
          }
          if (this.centros[i].tipoCentro === 'PGTEMD') {
            this.centroPgtemd.push({label: this.centros[i].descCentro, value: this.centros[i].idCentro, tipo: this.centros[i].tipoCentro});//, id: { idCentro: this.centros[i].idCentro, telefono: this.centros[i].telefono, tipoCentro: this.centros[i].tipoCentro, activo: this.centros[i].activo }});
          }
        }
      }
    });
  }

  cargarFormulario(userResponse: UserResponse, editar: boolean) {
    if (editar) {
      userResponse.centroCptemd = null;
      userResponse.centroPgtemd = null;
      for (let i=0; i < this.centrosEdit.length; i++) {
        if (this.centrosEdit[i].tipoCentro === 'CPTEMD') {
          userResponse.centroCptemd = this.centrosEdit[i].idCentro;
        } else {
          userResponse.centroPgtemd = userResponse.centros[i].idCentro;
        }
      }
      this.formulario = this.fb.group({
        'numDoc': new FormControl({value: userResponse.dni, disabled: editar}, Validators.required),
        'nombreUsuario': new FormControl({value: userResponse.nombreUsuario, disabled: editar}, Validators.required),
        'primerApellido': new FormControl({value: userResponse.primerApellido, disabled: editar}, Validators.required),
        'segundoApellido': new FormControl({value: userResponse.segundoApellido, disabled: editar}),
        'codUsuario': new FormControl({value: userResponse.codUsuario, disabled: editar}, Validators.required),
        'grupos' : new FormControl({value: userResponse.roles, disabled: false}, Validators.required),
        'cGestion': new FormControl(userResponse.centroPgtemd),
        'cPersonalizacion': new FormControl(userResponse.centroCptemd)
      });
    } else {
      this.rolesSelecionados = [];
      this.formulario = this.fb.group({
        'numDoc': new FormControl({value: userResponse.dni, disabled: editar}, Validators.required),
        'nombreUsuario': new FormControl({value: userResponse.nombreUsuario, disabled: true}, Validators.required),
        'primerApellido': new FormControl({value: userResponse.primerApellido, disabled: true}, Validators.required),
        'segundoApellido': new FormControl({value: userResponse.segundoApellido, disabled: true}),
        'codUsuario': new FormControl({value: userResponse.codUsuario, disabled: true}),
        'grupos': new FormControl('', Validators.required),
        'cGestion': new FormControl({value:'', disabled: true}),
        'cPersonalizacion': new FormControl({value:'', disabled: true})
      });
    }
    this.displayDialog = true;
  }

  cargarUsuarios() {
    this.mtoUsuarioService.getList().subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.usuarios = res.restResponse;
      }
    });
  }

  delete(codUsuario: string) {
    this.confirmationService.confirm({
      message: this.translate.instant('alertas.alertaEliminar'),
      accept: () => {
        this.mtoUsuarioService.deleteUsuario(codUsuario).subscribe(res => {
          this.cargarUsuarios();
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEliminado'), false);
        });
      }
    });
  }

  editar(codUsuario: string, enDetalle: boolean) {
    this.mtoUsuarioService.getUsuario(codUsuario).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        if (res.restResponse.codUsuario == codUsuario) {
          this.usuariosEdit = res.restResponse;
          this.centrosEdit = res.restResponse.centros;
          this.rolesSelecionados = res.restResponse.roles;
          this.cargarFormulario(this.usuariosEdit, true);
        }
        if (enDetalle) {
          this.edit = false;
          this.lupa = true;
          this.titleUserHeader = this.translate.instant('DetailUser');
          this.formulario.disable();
        } else {
          this.edit = true;
          this.lupa = true;
          this.titleUserHeader = this.translate.instant('EditUser');
          this.centross = res.restResponse.centros;
          this.changeRoles();
        }
        this.isNew = false;
      }
    });
  }

  add() {
    this.edit = true;
    this.lupa = false;
    this.titleUserHeader = this.translate.instant('NewUser');
    this.usuariosEdit = new UserResponse();
    this.cargarFormulario(this.usuariosEdit, false);
    this.isNew = true;
  }

  save() {
    this.displayDialog = false;
    this.usuariosEdit.dni = this.formulario.value.numDoc;
    this.usuariosEdit.codUsuario = this.formulario.controls["codUsuario"].value;
    this.usuariosEdit.nombreUsuario = this.formulario.controls["nombreUsuario"].value;
    this.usuariosEdit.primerApellido = this.formulario.controls["primerApellido"].value;
    this.usuariosEdit.segundoApellido = this.formulario.controls["segundoApellido"].value;
    if (this.isNew) {
      this.usuariosEdit.roles = this.rolesSelecionados;
      this.usuariosEdit.centros = this.centross;
      this.mtoUsuarioService.addUsuario(this.usuariosEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if (res.restResponse) {
          this.cargarUsuarios();
          this.centross = [];
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regAniadido'), false);
        }
      });
    } else {
      //this.seleccionarRoles();
      this.usuariosEdit.centros = this.centross;
      this.usuariosEdit.roles = this.rolesSelecionados;
      this.mtoUsuarioService.editUsuario(this.usuariosEdit).subscribe(res => {
        if (res.controlado) {
          this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
        } else if (res.restResponse) {
          this.cargarUsuarios();
          this.centross = [];
          this.toastService.addSingle('success', '', this.translate.instant('alertas.regEditado'), false);
        }
      });
    }
  }

  getDatosDicodef() {
    this.formulario.controls["codUsuario"].setValue("");
    this.formulario.controls["nombreUsuario"].setValue("");
    this.formulario.controls["primerApellido"].setValue("");
    this.formulario.controls["segundoApellido"].setValue("");

    this.mtoUsuarioService.getUsuarioDicodef(this.formulario.value.numDoc).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      } else if(res.restResponse) {
        this.formulario.controls["codUsuario"].setValue(res.restResponse.codUsuario);
        this.formulario.controls["nombreUsuario"].setValue(res.restResponse.nombreUsuario);
        this.formulario.controls["primerApellido"].setValue(res.restResponse.primerApellido);
        this.formulario.controls["segundoApellido"].setValue(res.restResponse.segundoApellido);
      }
    });
  }

  rolesByCodUsuario(codUsuario: string) {
    this.mtoUsuarioService.getRolesByUser(codUsuario).subscribe(res => {
      if (res.controlado) {
        this.toastService.addSingle('error', 'Error de aplicación', res.descripcion, true);
      }
      if (res.restResponse) {
        this.rolesSelecionados = res.restResponse;
      }
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.formulario.value); }

  changeRoles() {
    this.arrayCodRolesSeleccionados = []; //inicializamos el array de los roles seleccioandos
    
    for (let i=0; i < this.rolesSelecionados.length; i++) {
      this.arrayCodRolesSeleccionados[i] = this.rolesSelecionados[i].codRol;
    }
    
    // inicializamos deshabilitando los combos
    this.formulario.controls['cGestion'].disable();
    this.formulario.controls['cPersonalizacion'].disable();
   
    if (this.arrayCodRolesSeleccionados.includes('ADMINISTRADOR')) { // si entre los seleccionados hay administrador, los habilito
      this.formulario.controls['cGestion'].enable();
      this.formulario.controls['cPersonalizacion'].enable();
    } else if ((this.arrayCodRolesSeleccionados.includes('Responsable CPTEMD') || this.arrayCodRolesSeleccionados.includes('Operador CPTEMD'))  && (!this.arrayCodRolesSeleccionados.includes('Operador PGTEMD'))) {
      this.formulario.controls['cPersonalizacion'].enable();
      this.formulario.controls['cGestion'].disable();
      this.formulario.controls['cGestion'].setValue('');
      this.borrarCGestion();
    } else if ((this.arrayCodRolesSeleccionados.includes('Operador PGTEMD')) && (!(this.arrayCodRolesSeleccionados.includes('Responsable CPTEMD') || this.arrayCodRolesSeleccionados.includes('Operador CPTEMD')))) {
      this.formulario.controls['cGestion'].enable();
      this.formulario.controls['cPersonalizacion'].disable();
      this.formulario.controls['cPersonalizacion'].setValue('');
      this.borrarCPersonalizacion();
    } else if (this.arrayCodRolesSeleccionados.length > 0) {
      this.formulario.controls['cGestion'].enable();
      this.formulario.controls['cPersonalizacion'].enable();
    }
  }

  changeCGestion(e: any) {
    //borramos lo que hubiera de Gestion en centross y metemos el seleccionado
    for (let i=0; i < this.centross.length; i++) {
      if (this.centross[i].tipoCentro === 'PGTEMD') {
        this.centross.splice(i, 1);
      }
    }
    this.centroPgtemd.map((pgtemd) => {
      if (e.value === pgtemd.value) {
        this.centross.push({idCentro: pgtemd.value, descCentro: pgtemd.label, tipoCentro: pgtemd.tipo});
      }
    });
  }

  borrarCGestion() {
    for (let i=0; i < this.centross.length; i++) {
      if (this.centross[i].tipoCentro === 'PGTEMD') {
        this.centross.splice(i, 1);
      }
    }
  }

  changeCPersonalizacion(e: any) {
    //borramos lo que hubiera de Gestion en centross y metemos el seleccionado
    for (let i=0; i < this.centross.length; i++) {
      if (this.centross[i].tipoCentro === 'CPTEMD') {
        this.centross.splice(i, 1);
      }
    }
    this.centroCptemd.map((cptemd) => {
      if (e.value === cptemd.value) {
        this.centross.push({idCentro: cptemd.value, descCentro: cptemd.label, tipoCentro: cptemd.tipo});
      }
    });
  }

  borrarCPersonalizacion() {
    for (let i=0; i < this.centross.length; i++) {
      if (this.centross[i].tipoCentro === 'CPTEMD') {
        this.centross.splice(i, 1);
      }
    }
  }
}