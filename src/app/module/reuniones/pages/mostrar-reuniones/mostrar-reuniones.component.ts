import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { Reunion } from 'src/app/shared/models/reunion.model';

@Component({
  selector: 'app-mostrar-reuniones',
  templateUrl: './mostrar-reuniones.component.html',
  styleUrls: ['./mostrar-reuniones.component.scss']
})
export class MostrarReunionesComponent {
  reuniones: Reunion[] = [];
  esAdministrador: boolean;

  constructor(
    private reunionService: ReunionHttpService,
    private authService: AuthService
  ) {
    this.esAdministrador = this.authService.isCoordinador();
  }

  ngOnInit() {
    this.reunionService.getAll().subscribe(data => {
      this.reuniones = data;
    });
  }

  eliminarReunion(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reunión?')) {
      this.reunionService.delete(id).subscribe(() => {
        this.reuniones = this.reuniones.filter(r => r.id !== id);
      });
    }
  }
}