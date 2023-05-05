import { SemestreGrupo } from './semestre-grupo.model';
import { Usuario } from './usuario.model';
import { UnidadDeAprendizaje } from './unidad-de-aprendizaje.model';

export interface Encuesta {
    id: number;
    cantidadAlumnos: number;
    cantidadAprobados: number;
    cantidadReprobados: number;
    observaciones: string | null;
    semestreGrupo: SemestreGrupo;
    semestreGrupoId: number;
    usuario: Usuario;
    usuarioId: number;
    unidadDeAprendizaje: UnidadDeAprendizaje;
    unidadDeAprendizajeId: number;
}
