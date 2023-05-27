export class ComentarioGetDTO {
    codigo: number = 0;
    fecha: Date;
    mensaje: string = "";
    codigoUsuario: number = 0;
    codigoProducto: number = 0;

    constructor(codigo: number, fecha: Date, mensaje: string, codigoUsuario: number, codigoProducto: number) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.mensaje = mensaje;
        this.codigoUsuario = codigoUsuario;
        this.codigoProducto = codigoProducto;
    }
}
