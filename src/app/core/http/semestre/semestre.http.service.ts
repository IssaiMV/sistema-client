import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SemestreGrupo } from 'src/app/shared/models/semestre-grupo.model';
import { Semestre } from 'src/app/shared/models/semestre.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class SemestreHttpService {

  private url: string = ApiEnvironment.fullUrl + 'semestres';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Semestre[]> {
    return this.http.get<Semestre[]>(this.url);
  }
  getAllGrupos(id: number): Observable<SemestreGrupo[]> {
    return this.http.get<SemestreGrupo[]>(this.url + `/${id}/grupos`);
  }
}
