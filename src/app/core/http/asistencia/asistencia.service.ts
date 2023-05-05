import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/shared/models/asistencia.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private API_URL = ApiEnvironment.fullUrl + 'asistencias';

  constructor(private http: HttpClient) { }

  getAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.API_URL}`);
  }

  getAsistencia(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.API_URL}/${id}`);
  }

  crearAsistencia(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${this.API_URL}`, asistencia);
  }

  actualizarAsistencia(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.API_URL}/${asistencia.id}`, asistencia);
  }

  eliminarAsistencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
