export class DetalleCompraGetDTO {
    codigo: number;
    codigoPublicacion: number;
    unidades: number;
    precioUnidad: number;

    constructor(codigo: number, codigoPublicacion: number, unidades: number, precioUnidad: number) {
        this.codigo = codigo;
        this.codigoPublicacion = codigoPublicacion;
        this.unidades = unidades;
        this.precioUnidad = precioUnidad;
    }
}
