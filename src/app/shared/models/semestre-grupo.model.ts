import { Grupo } from "./grupo.model";
import { Semestre } from "./semestre.model";

export interface SemestreGrupo {
    id: number;
    semestre: Semestre;
    semestreId: number;
    grupo: Grupo;
    grupoId: number;
}