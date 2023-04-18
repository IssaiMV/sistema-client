import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { RolUsuario } from 'src/app/shared/enums/rol-usuario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent {

  usuarioForm: FormGroup;
  roles = [];
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioHttpService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      coordinadorId: [null]
    });

    this.usuarioService.getAll().subscribe(usuarios => {
      this.usuarios = usuarios.filter((usuario: Usuario) => usuario.rol === RolUsuario.COORDINADOR);
    });
  }
  get nombre() { return this.usuarioForm.get('nombre'); }
  get apellidoPaterno() { return this.usuarioForm.get('apellidoPaterno'); }
  get apellidoMaterno() { return this.usuarioForm.get('apellidoMaterno'); }
  get email() { return this.usuarioForm.get('email'); }
  get password() { return this.usuarioForm.get('password'); }
  get rol() { return this.usuarioForm.get('rol'); }
  get coordinadorId() { return this.usuarioForm.get('coordinadorId'); }

  submit() {
    if (this.usuarioForm.valid) {
      this.usuarioService.create(this.usuarioForm.value).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  mostrarSelectCoordinador() {
    return this.rol?.value === RolUsuario.PROFESOR;
  }
}
