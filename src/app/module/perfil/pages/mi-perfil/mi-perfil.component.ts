import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UsuarioHttpService } from 'src/app/core/http/usuarios/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent {
  form: FormGroup;
  roles = [];
  usuario: Usuario | undefined;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioHttpService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });

  }

  ngOnInit() {
    const id = this.authService.getIdFromToken();
    this.usuarioService.getById(id).subscribe(data => {
      this.usuario = data;
      this.form.patchValue(data);
    });
  }

  submit() {
    if (this.form.valid) {
      this.usuarioService.update(this.form.value).subscribe(() => {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      });
    }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }

      return {};
    };
  }

  get nombre() { return this.form.get('nombre'); }
  get apellidoPaterno() { return this.form.get('apellidoPaterno'); }
  get apellidoMaterno() { return this.form.get('apellidoMaterno'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get formControls() { return this.form.controls; }
}
