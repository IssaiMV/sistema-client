import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reunion } from 'src/app/shared/models/reunion.model';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class ReunionHttpService {
  private API_URL = ApiEnvironment.fullUrl + 'reuniones';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(this.API_URL);
  }

  get(id: number): Observable<Reunion> {
    return this.http.get<Reunion>(`${this.API_URL}/${id}`);
  }

  create(reunion: Reunion): Observable<Reunion> {
    console.log(reunion);
    return this.http.post<Reunion>(this.API_URL, reunion);
  }

  update(id: number, reunion: Reunion): Observable<Reunion> {
    return this.http.put<Reunion>(`${this.API_URL}/${id}`, reunion);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
