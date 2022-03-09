export class FabricanteResponse {

    constructor() {
        this.idFabricante = null;
        this.descLocalidad = null;
        this.descCp = null;
        this.descDireccion = null;
        this.descFichero = null;
        this.descMail = null;
        this.descNombre = null;
        this.descPais = null;
        this.descProveedor = null;
        this.descTelefono = null;
        this.indActivo = 1;
    }

    idFabricante: number;
    descLocalidad: string;
    descCp: string;
    descDireccion: string;
    descFichero: string;
    descMail: string;
    descNombre: string;
    descPais: string;
    descProveedor: string;
    descTelefono: string;
    indActivo: number;
    activos?: string = '';
}