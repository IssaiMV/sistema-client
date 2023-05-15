import { Asistencia } from "./asistencia.model";
import { Usuario } from "./usuario.model";

export interface Reunion {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_hora: Date;
    enlace: string;
    coordinadorId: number;
    coordinador?: Usuario;
    estatus: string;
    asistencias: Asistencia[] | number[];
}