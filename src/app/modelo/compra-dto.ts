import { DetalleCompraDTO } from "./detalle-compra-dto";

export class CompraDTO {
    codigoUsuario: number = 0;
    metodoPago: string = "";
    detalleCompra!: DetalleCompraDTO[];
}
