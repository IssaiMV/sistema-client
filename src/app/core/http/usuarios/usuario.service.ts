import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  private apiUrl = ApiEnvironment.fullUrl + "users"; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Operación de lectura (Read)
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Operación de lectura (Read)
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Obtener varios usuarios por sus IDs
  getUsuariosByIds(ids: number[]): Observable<Usuario[]> {
    const idParams = ids.join(',');
    const url = `${this.apiUrl}/ids/${idParams}`;
    return this.http.get<Usuario[]>(url);
  }

  // Operación de creación (Create)
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Operación de actualización (Update)
  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  // Operación de eliminación (Delete)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
