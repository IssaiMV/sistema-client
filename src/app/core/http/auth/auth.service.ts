
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEnvironment } from 'src/environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const endPoint = ApiEnvironment.fullUrl + ApiEnvironment.routes.auth.login

    const queryParams = {
      email,
      password
    };

    return this.http.post<any>(endPoint, queryParams);
  }

}
