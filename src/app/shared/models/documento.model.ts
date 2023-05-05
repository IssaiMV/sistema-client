import { TipoDocumento } from "../enums/tipo-documento.enum";
import { Usuario } from "./usuario.model";

export interface Documento {
    id?: number;
    usuarioId: number;
    nombre: string;
    ruta: string;
    tipo: TipoDocumento;
    fecha_hora: Date;
    usuario?: Usuario;
}