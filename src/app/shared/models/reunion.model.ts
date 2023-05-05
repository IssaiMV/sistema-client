import { Asistencia } from "./asistencia.model";

export interface Reunion {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_hora: Date;
    enlace: string;
    coordinadorId: number;
    estatus: string;
    asistencias: Asistencia[] | number[];
}