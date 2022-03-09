export class OpcMenu {
    /*constructor(idOpcMenu:Number, activo:boolean, descripcion:string, icono:string, idMenu:Number, porDefecto:boolean, uri:string) {
        this.idOpcMenu = idOpcMenu;
        this.activo = activo;
        this.descripcion = descripcion;
        this.icono = icono;
        this.idMenu = idMenu;
        this.porDefecto = porDefecto;
        this.uri = uri;
    }*/

    constructor() {
        this.idOpcMenu = null;
        this.activo = null;
        this.descripcion = null;
        this.icono = null;
        this.idMenu = null;
        this.porDefecto = null;
        this.uri = null;
    }

    idOpcMenu: Number;
    activo: boolean;
    descripcion: string;
    icono: string;
    idMenu: Number;
    porDefecto: boolean;
    uri:string
    
}
