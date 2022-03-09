import { CentroResponse } from "./centro-response.model";
import { RolResponse } from "./rol-response.model";

export class UserResponse {
    constructor() {
        this.dni = null;
        this.codUsuario = null;
        this.nombreUsuario = null;
        this.primerApellido = null;
        this.segundoApellido = null;
    }

    dni: string;
    codUsuario: string;
    nombreUsuario: string;
    primerApellido: string;
    segundoApellido: string;
    roles: RolResponse[] = [];
    centros?: CentroResponse[] = [];
    centroCptemd?: number;
    centroPgtemd?: number;
}