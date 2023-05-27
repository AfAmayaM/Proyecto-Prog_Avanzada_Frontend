import { ProductoDTO } from "./producto-dto";

export class DetalleCompraDTO {
    //producto: ProductoDTO = new ProductoDTO();
    codigoPublicacion: number = 0;
    unidades: number = 0;
    valorTotal: number = 0;
    precioUnidad: number = 0.0;

    constructor(codigoPublicacion: number, unidades: number) {
        //this.producto= producto;
        this.codigoPublicacion = codigoPublicacion;
        this.unidades = unidades;
        //this.valorTotal = unidades * producto.precio;
    }
}
