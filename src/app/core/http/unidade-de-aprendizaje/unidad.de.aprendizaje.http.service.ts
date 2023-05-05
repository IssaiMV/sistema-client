import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadDeAprendizaje } from 'src/app/shared/models/unidad-de-aprendizaje.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class UnidadDeAprendizajeHttpService {

  private apiUrl = `${ApiEnvironment.fullUrl}unidades-de-aprendizaje`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<UnidadDeAprendizaje[]> {
    return this.http.get<UnidadDeAprendizaje[]>(this.apiUrl);
  }

  getById(id: number): Observable<UnidadDeAprendizaje> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UnidadDeAprendizaje>(url);
  }

  create(unidadDeAprendizaje: UnidadDeAprendizaje): Observable<UnidadDeAprendizaje> {
    return this.http.post<UnidadDeAprendizaje>(this.apiUrl, unidadDeAprendizaje);
  }

  update(unidadDeAprendizaje: UnidadDeAprendizaje): Observable<UnidadDeAprendizaje> {
    const url = `${this.apiUrl}/${unidadDeAprendizaje.id}`;
    return this.http.put<UnidadDeAprendizaje>(url, unidadDeAprendizaje);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
