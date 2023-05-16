import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from 'src/app/shared/models/encuesta.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class EncuestaHttpService {

  private baseUrl = ApiEnvironment.fullUrl + 'encuestas';

  constructor(private http: HttpClient) { }

  getEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.baseUrl);
  }
  getGraficas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/graficas');
  }

  getEncuesta(id: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.baseUrl}/${id}`);
  }

  addEncuesta(encuesta: Encuesta): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.baseUrl, encuesta);
  }

  updateEncuesta(encuesta: Encuesta): Observable<Encuesta> {
    return this.http.put<Encuesta>(`${this.baseUrl}/${encuesta.id}`, encuesta);
  }

  deleteEncuesta(id: number): Observable<Encuesta> {
    return this.http.delete<Encuesta>(`${this.baseUrl}/${id}`);
  }
}