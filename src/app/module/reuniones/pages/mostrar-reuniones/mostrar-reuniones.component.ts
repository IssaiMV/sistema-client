import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { UserService } from 'src/app/core/service/user.service';
import { Reunion } from 'src/app/shared/models/reunion.model';

@Component({
  selector: 'app-mostrar-reuniones',
  templateUrl: './mostrar-reuniones.component.html',
  styleUrls: ['./mostrar-reuniones.component.scss']
})
export class MostrarReunionesComponent {
  reuniones: Reunion[] = [];
  esAdministrador: boolean;
  esProfesor: boolean;

  constructor(
    private reunionService: ReunionHttpService,
    private authService: AuthService,
    public userService: UserService
  ) {
    this.esAdministrador = this.authService.isCoordinador();
    this.esProfesor = this.authService.isProfesor();
  }

  ngOnInit() {
    this.reunionService.getAll().subscribe(data => {
      this.reuniones = data;
      if (this.esProfesor) {
        this.reuniones = this.reuniones.filter((reunion: Reunion) => reunion.coordinadorId === this.authService.getCoordinadorId())
      }
      if (this.authService.isCoordinador()) {
        this.reuniones = this.reuniones.filter((reunion: Reunion) => reunion.coordinadorId === this.authService.getIdFromToken())
      }
    });
  }

  eliminarReunion(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reunión?')) {
      this.reunionService.delete(id).subscribe(() => {
        this.reuniones = this.reuniones.filter(r => r.id !== id);
      });
    }
  }
  getBgStatus(status: string): string {
    if (status === 'Realizada') return 'bg-success';
    if (status === 'Pendiente') return 'bg-warning';
    if (status === 'Cancelada') return 'bg-danger';
    return 'bg-secondary';
  }
}
