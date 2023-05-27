export class ProductoGetDTO {
    codigo: number = 0;
    nombre: string = "";
    descripcion: string = "";
    unidades: number = 0;
    precio: number = 0.0;
    imagenes: string[] = [];
    categorias: string[] = [];

    constructor(codigo: number, nombre: string, descripcion: string, unidades: number, precio: number, imagenes: string[], categorias: string[]) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidades = unidades;
        this.precio = precio;
        this.imagenes = imagenes;
        this.categorias = categorias;
    }
}
