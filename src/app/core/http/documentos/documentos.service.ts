import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from 'src/app/shared/models/documento.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class DocumentoHttpService {

  constructor(private http: HttpClient) { }

  private urlBase = ApiEnvironment.fullUrl + 'documentos';
  private urlUpload = ApiEnvironment.fullUrl + 'upload';

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.urlBase);
  }

  getDocumento(id: number): Observable<Documento> {
    const url = `${this.urlBase}/${id}`;
    return this.http.get<Documento>(url);
  }

  crearDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.urlBase, documento);
  }

  actualizarDocumento(id: number, cambios: Partial<Documento>): Observable<Documento> {
    const url = `${this.urlBase}/${id}`;
    return this.http.patch<Documento>(url, cambios);
  }

  eliminarDocumento(id: number): Observable<void> {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete<void>(url);
  }

  subirDocumento(archivo: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', archivo, archivo.name);
    return this.http.post<string>(`${this.urlUpload}`, formData);
  }

}
