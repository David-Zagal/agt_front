export class EmplazamientoResponse {

    constructor() {
        this.idEmplazamiento = null;
        this.descEmplazamiento = null;
        this.localidad = null;
        this.provincia = null;
        this.cp = null;
        this.direccion = null;
        this.pais = null;
        this.activo = 1;
    }

    idEmplazamiento: number;
    descEmplazamiento: string;
    localidad: string;
    provincia: string;
    cp: string;
    direccion: string;
    pais: string;
    activo: number;
}