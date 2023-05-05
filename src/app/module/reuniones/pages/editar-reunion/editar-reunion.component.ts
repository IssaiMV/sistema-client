import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { ReunionEstatus } from 'src/app/shared/enums/reunion-estatus.enum';
import { RolUsuario } from 'src/app/shared/enums/rol-usuario.enum';
import { Reunion } from 'src/app/shared/models/reunion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-editar-reunion',
  templateUrl: './editar-reunion.component.html',
  styleUrls: ['./editar-reunion.component.scss']
})
export class EditarReunionComponent {
  reunion: Reunion | undefined;
  id: any = 0;
  reunionForm: FormGroup;
  estatusList = Object.values(ReunionEstatus);
  usuariosList: Array<Usuario> = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reunionService: ReunionHttpService,
    private usuarioService: UsuarioHttpService,
    private route: ActivatedRoute, private router: Router,
  ) {
    this.reunionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      fecha_hora: ['', Validators.required],
      enlace: ['', [Validators.required, Validators.pattern('^https?://.+')]],
      estatus: ['', Validators.required],
      asistencias: [[], Validators.required],
    });
    this.usuarioService.getAll().subscribe((usuarios) => {
      this.usuariosList = usuarios
        .filter((usuario: Usuario) => usuario.rol === RolUsuario.PROFESOR);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.reunionService.get(parseInt(this.id)).subscribe(_reunion => {
        this.reunion = _reunion;
        this.reunion.asistencias = _reunion.asistencias.map((asistencia: any) => asistencia.usuarioId);
        this.reunionForm.patchValue(this.reunion);
      });
  }

  get titulo() {
    return this.reunionForm.get('titulo');
  }

  get descripcion() {
    return this.reunionForm.get('descripcion');
  }

  get fecha_hora() {
    return this.reunionForm.get('fecha_hora');
  }

  get enlace() {
    return this.reunionForm.get('enlace');
  }

  get estatus() {
    return this.reunionForm.get('estatus');
  }

  get asistencias() {
    return this.reunionForm.get('asistencias');
  }

  guardarReunion() {
    if (this.reunionForm.valid) {
      const reunion: Reunion = {
        ...this.reunionForm.value,
        coordinadorId: this.authService.getIdFromToken()
      };

      this.reunionService.update(this.id, reunion).subscribe(() => {
        this.router.navigate(['/reuniones']);
      });
    }
  }

  nombreCompleto(usuario: Usuario) {
    return `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
  }
}
