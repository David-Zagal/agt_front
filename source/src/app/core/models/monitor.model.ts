export class Monitor {
    constructor(estado: string, nombre: string, url: string, mensaje:string) {
        this.estado = estado;
        this.nombre = nombre;
        this.url = url;
        this.mensaje = mensaje;
    }
    estado: string;
    nombre: string;
    url: string;
    mensaje: string;
}