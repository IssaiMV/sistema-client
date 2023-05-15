import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { RolUsuario } from 'src/app/shared/enums/rol-usuario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  form: FormGroup;
  roles = [];
  usuarios: Usuario[] = [];
  usuario: Usuario | undefined;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: [Validators.required],
      coordinadorId: [null]
    });

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.usuarioService.getById(parseInt(id)).subscribe(data => {
        this.usuario = data;
        this.form.patchValue(data);
      });
    this.usuarioService.getAll().subscribe(usuarios => {
      this.usuarios = usuarios.filter((usuario: Usuario) => usuario.rol === RolUsuario.COORDINADOR);
    });
  }

  submit() {
    if (this.form.valid) {
      this.usuarioService.update(this.form.value).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  get nombre() { return this.form.get('nombre'); }
  get apellidoPaterno() { return this.form.get('apellidoPaterno'); }
  get apellidoMaterno() { return this.form.get('apellidoMaterno'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get rol() { return this.form.get('rol'); }
  get coordinadorId() { return this.form.get('coordinadorId'); }

  mostrarSelectCoordinador() {
    return this.rol?.value === RolUsuario.PROFESOR;
  }
}