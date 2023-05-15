import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { UserService } from 'src/app/core/service/user.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  usuarios: Usuario[] = [];
  isCoordinador: boolean;
  titulo: string;

  constructor(
    private usuarioService: UsuarioHttpService,
    public userService: UserService,
    private authService: AuthService
  ) {
    this.isCoordinador = authService.isCoordinador();
    this.titulo = this.isCoordinador ? 'Mis profesores' : 'Usuarios';
  }

  ngOnInit() {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
      });
    }
  }
}
