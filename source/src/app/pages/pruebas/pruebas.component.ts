import { Component, OnInit } from '@angular/core';
import { MenuDataService } from '../../core/services/menu-data.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})

export class PruebasComponent implements OnInit {

  // Constante de funcionalidades para la llamada para traer los getPermisos
  funcionalidades: any = [
    {
      text: 'ADM_MENU', // funcionalidades de la tabla de BBDD funcionalidades
      acciones: {
        lectura: ['boton1'],
        escritura: ['boton3', 'boton5', 'panel']
      }
    },
    {
      text: 'ADM_USUARIO',
      acciones: {
        lectura: ['boton6'],
        escritura: ['boton7']
      }
    }
  ];

  permisos: string[] = [];

  constructor(private menuDataService: MenuDataService) {
  }

  ngOnInit() {
    this.permisos = this.menuDataService.getPermisos(this.funcionalidades);
  }

  funcion1() {
    alert(1);
  }
  funcion2() {
    alert(2);
  }
  funcion3() {
    alert(3);
  }
  funcion4() {
    alert(4);
  }
  funcion5() {
    alert(5);
  }
}
