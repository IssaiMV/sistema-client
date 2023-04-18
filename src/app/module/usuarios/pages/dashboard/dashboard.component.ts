import { Component } from '@angular/core';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioHttpService) { }

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
