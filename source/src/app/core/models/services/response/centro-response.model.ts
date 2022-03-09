import { EmplazamientoResponse } from "./emplazamiento-response.model";

export class CentroResponse {

    constructor() {
        this.idCentro = null;
        this.descCentro = null;
        this.telefono = null;
        this.tipoCentro = 'PGTEMD';
        this.activo = 1;
    }

    idCentro: number;
    descCentro?: string;
    telefono?: string;
    tipoCentro?: string;
    activo?: number;
    agtEmplazamientoDTO?: EmplazamientoResponse = null;
    activos?: string = '';
}