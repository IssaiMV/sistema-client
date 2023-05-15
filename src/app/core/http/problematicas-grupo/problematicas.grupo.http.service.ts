import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblematicaGrupo } from 'src/app/shared/models/problematicas.grupo.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class ProblematicasGrupoHttpService {

  private url: string = ApiEnvironment.fullUrl + 'problematicas-grupo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProblematicaGrupo[]> {
    return this.http.get<ProblematicaGrupo[]>(this.url);
  }
}
