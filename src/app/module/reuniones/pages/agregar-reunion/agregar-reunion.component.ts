import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { ReunionEstatus } from 'src/app/shared/enums/reunion-estatus.enum';
import { RolUsuario } from 'src/app/shared/enums/rol-usuario.enum';
import { Reunion } from 'src/app/shared/models/reunion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-agregar-reunion',
  templateUrl: './agregar-reunion.component.html',
  styleUrls: ['./agregar-reunion.component.scss']
})
export class AgregarReunionComponent {
  reunionForm: FormGroup;
  estatusList = Object.values(ReunionEstatus);
  usuariosList: Array<Usuario> = [];


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reunionService: ReunionHttpService,
    private usuarioService: UsuarioHttpService,
    private router: Router
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
      this.usuariosList = usuarios.filter((usuario: Usuario) => usuario.rol === RolUsuario.PROFESOR);
    });
  }

  guardarReunion() {
    if (this.reunionForm.valid) {
      const reunion: Reunion = {
        ...this.reunionForm.value,
        coordinadorId: this.authService.getIdFromToken(),
        asistencias: [...this.asistencias?.value]
      };
      this.reunionService.create(reunion).subscribe(() => {
        this.router.navigate(['/reuniones']);
      });
    }
  }

  nombreCompleto(usuario: Usuario) {
    return `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
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
}
