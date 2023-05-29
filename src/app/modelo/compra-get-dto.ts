import { DetalleCompraGetDTO } from "./detalle-compra-get-dto";

export class CompraGetDTO {
    codigo: number = 0;
    fecha!: Date;
    codigoUsuario: number = 0;
    valorTotal:number = 0;
    metodoPago:string = "";
    detalleCompra!: DetalleCompraGetDTO[];

    constructor(codigo: number, fecha: Date, codigoUsuario: number, valorTotal: number, metodoPago: string, detalleCompra: DetalleCompraGetDTO[]) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.codigoUsuario = codigoUsuario;
        this.valorTotal = valorTotal;
        this.metodoPago = metodoPago;
        this.detalleCompra = detalleCompra;
    }
}
