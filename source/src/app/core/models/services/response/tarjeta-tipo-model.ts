import { TarjetaModeloResponse } from "./tarjeta-modelo.model";

export class TarjetaTipoResponse {
    constructor () {
        this.idTarjetaTipo = null;
        this.descPersonalizacion = '';
        this.descTarjetaTipo = '';
        this.indActivo = 1;
    }

    idTarjetaTipo: number;
    descPersonalizacion: string;
    descTarjetaTipo: string;
    indActivo: number;
    agtTarjetaModeloDTO?: TarjetaModeloResponse = null;
    activos?: string = '';
}