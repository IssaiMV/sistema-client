export interface Usuario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    password: string;
    rol: string;
    coordinadorId: number;
    coordinador: Usuario;
}