export class ServiceResponse<responseType> {
    constructor(codigo: string, descripcion: string, controlado: boolean, execDt: Date, restResponse: any) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.controlado = controlado;
        this.execDt = execDt;
        this.restResponse = restResponse;

    }

    codigo: string;
    descripcion: string;
    controlado: boolean;
    execDt: Date;
    restResponse: responseType;

}

