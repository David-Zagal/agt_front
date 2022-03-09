import { FabricanteResponse } from "./fabricante-response.model";

export class TarjetaModeloResponse {

    constructor () {
        this.idTarjetaModelo = null;
        this.descAtr = '';
        this.descMascaraAtr = '';
        this.descTarjetaModelo = '';
        this.indActivo = 1;
    }

    idTarjetaModelo: number;
    agtFabricanteDTO?: FabricanteResponse = null;
    descAtr: string;
    descMascaraAtr: string;
    descTarjetaModelo: string;
    indActivo: number;
    activos?: string = '';
}