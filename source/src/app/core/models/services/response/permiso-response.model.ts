export class PermisoResponse {
    constructor(codFuncionalidad: string, descripcionFuncionalidad: string, codPermiso: string,
        descripcionPermiso: string, codRol: string, descripcionRol: string) {
        this.codFuncionalidad = codFuncionalidad;
        this.descripcionFuncionalidad = descripcionFuncionalidad;
        this.codPermiso = codPermiso;
        this.descripcionPermiso = descripcionPermiso;
        this.codRol = codRol;
        this.descripcionRol = descripcionRol;
    }
    codFuncionalidad: string;
    descripcionFuncionalidad: string;
    codPermiso: string;
    descripcionPermiso: string;
    codRol: string;
    descripcionRol: string;
}