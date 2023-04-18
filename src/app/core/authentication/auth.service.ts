import { Injectable } from '@angular/core';
import { AuthHttpService } from '../http/auth/auth.service';
import { RolUsuario } from 'src/app/shared/enums/rol-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'session';

  constructor(private authHttp: AuthHttpService) { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getIdFromToken(): number {
    const token = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    const id = payload.id;
    return id;
  }
  getRoleFromToken(): string {
    const token = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    const rol = payload.rol;
    return rol;
  }


  isLoggedIn(): boolean {
    const session = localStorage.getItem('session');
    if (session) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const role = this.getRoleFromToken();
    return role === RolUsuario.EVALUADOR;
  }

  isProfesor(): boolean {
    const role = this.getRoleFromToken();
    return role === RolUsuario.PROFESOR;
  }
  isCoordinador(): boolean {
    const role = this.getRoleFromToken();
    return role === RolUsuario.COORDINADOR;
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authHttp.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
          this.clearToken();
          this.setToken(response.token);
          return resolve(true);
        },
        error: (error) => {
          console.log(error);
          reject(false);
        }
      });
    });
  }

}
