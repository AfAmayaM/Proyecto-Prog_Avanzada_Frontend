import { DetalleCompraDTO } from "./detalle-compra-dto";

export class CompraDTO {
    email: string = "";
    metodoPago: string = "";
    detalleCompra!: DetalleCompraDTO[];
}
