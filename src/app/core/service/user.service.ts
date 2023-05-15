import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  nombreCompleto(usuario: Usuario | undefined) {
    if (usuario) {
      return `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
    }
    return '-';
  }
}
