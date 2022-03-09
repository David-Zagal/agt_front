import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MonitorService } from '../../core/services/monitor.service';
import { Monitor } from '../../core/models/monitor.model';
import { TranslateService } from '@ngx-translate/core';
import { constantes } from '../../core/common/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  //cols: any[];
  estados:Monitor[];

  constructor(private monitorService: MonitorService, private translate:TranslateService) {}

  ngOnInit() {
    const observable = this.monitorService.comprobarEstados();

    observable.subscribe((monitor:Monitor[]) => {
      this.estados = monitor;
    },err => {     
      let codError = "";
      if(err.status!=0){
        codError = "error.backend.conexion."+ err.status
      }else{
        codError = "error.backend.conexion.generico";          
      }
     
      let mensajeError = this.translate.instant(codError);
      this.estados = [ new Monitor('KO', 'BACKEND', environment.apiRestJava+constantes.endpoints.monitor,mensajeError) ];
    });

  }

}
