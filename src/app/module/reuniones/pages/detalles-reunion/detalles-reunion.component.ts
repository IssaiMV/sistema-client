import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from 'src/app/core/http/asistencia/asistencia.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { Asistencia } from 'src/app/shared/models/asistencia.model';
import { Reunion } from 'src/app/shared/models/reunion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-detalles-reunion',
  templateUrl: './detalles-reunion.component.html',
  styleUrls: ['./detalles-reunion.component.scss']
})
export class DetallesReunionComponent {
  reunion: Reunion = {
    id: 0,
    titulo: "",
    descripcion: "",
    fecha_hora: new Date(),
    enlace: "",
    coordinadorId: 0,
    estatus: '',
    asistencias: []
  };

  listaAsistentes: Array<Usuario> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reunionService: ReunionHttpService,
    private asistenciaService: AsistenciaService,
    private usuarioService: UsuarioHttpService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reunionService.get(parseInt(id)).subscribe((reunion) => {
        this.reunion = reunion;
        this.obtenerAsistentes();
      });
    }
  }

  editarReunion(): void {
    this.router.navigate(['/reuniones', this.reunion.id, 'editar']);
  }

  eliminarReunion(): void {
    if (confirm(`¿Estás seguro que deseas eliminar la reunión "${this.reunion.titulo}"?`)) {
      this.reunionService.delete(this.reunion.id).subscribe(() => {
        this.router.navigate(['/reuniones']);
      });
    }
  }

  actualizarAsistencia(asistente: Asistencia, event: any) {
    asistente.asistio = event.target.checked ? 1 : 0;
    this.asistenciaService.actualizarAsistencia(asistente,).subscribe();
  }

  obtenerListaAsistentes(): Array<Asistencia> {
    const asistencias: Asistencia[] = [];
    this.reunion.asistencias.forEach((asistencia) => {
      if (typeof asistencia !== 'number') {
        asistencias.push(asistencia);
      }
    });
    return asistencias;
  }

  obtenerAsistentes() {
    const listaId = this.obtenerListaAsistentes().map((asistencia: Asistencia) => asistencia.usuarioId);
    this.usuarioService.getUsuariosByIds(listaId).subscribe((usuarios: Array<Usuario>) => {
      this.listaAsistentes = usuarios;
    });
  }

  obtenerInformacionUsuario(id: number): Usuario | void {
    return this.listaAsistentes.find((usuario: Usuario) => usuario.id === id);
  }

  nombreCompleto(usuario: Usuario | void) {
    if (usuario) {
      return `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
    }
    return '';
  }
}
