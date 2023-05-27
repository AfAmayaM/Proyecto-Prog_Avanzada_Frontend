import { ComentarioGetDTO } from "./comentario-get-dto";
import { DetalleCompraGetDTO } from "./detalle-compra-get-dto";
import { ProductoGetDTO } from "./producto-get-dto";
import { UsuarioGetDTO } from "./usuario-get-dto";

export class PublicacionGetDTO {
    codigo: number = 0;
    codigoCuenta: number = 0;
    codigoProducto: number = 0;
    fechaLimite!: Date;
    descuento: number = 0;
    estado: string = "";
    comentarios: ComentarioGetDTO[];
    detalleCompras: DetalleCompraGetDTO[];
    producto: ProductoGetDTO;

    constructor(codigo: number, vendedor: number, descuento: number, fechaLimite: Date, estado: string, comentarios: ComentarioGetDTO[], codigoProducto: number, detalleCompras: DetalleCompraGetDTO[], producto: ProductoGetDTO) {
        this.codigo = codigo;
        this.codigoCuenta = vendedor;
        this.descuento = descuento;
        this.fechaLimite = fechaLimite;
        this.estado = estado;
        this.comentarios = comentarios;
        this.codigoProducto = codigoProducto;
        this.detalleCompras = detalleCompras;
        this.producto = producto;
    }
}
