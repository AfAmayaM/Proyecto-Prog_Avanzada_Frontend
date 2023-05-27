export class UsuarioGetDTO {
    codigo: number = 0;
    nombre: string = "";
    apellido: string = "";
    email: string = "";
    contrasenia: string = "";
    direccion: string = "";
    telefono: string = "";

    constructor(codigo: number, nombre: string, apellido: string, email: string, contrasenia: string, direccion: string, telefono: string) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
