import { ProductoDTO } from "./producto-dto";

export class DetalleCompraDTO {
    codigoPublicacion: number = 0;
    unidades: number = 0;
    valorTotal: number = 0;
    precioUnidad: number = 0.0;

    constructor(codigoPublicacion: number, unidades: number) {
        this.codigoPublicacion = codigoPublicacion;
        this.unidades = unidades;
    }
}
