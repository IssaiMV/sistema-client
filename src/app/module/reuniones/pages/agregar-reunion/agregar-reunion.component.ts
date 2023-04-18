import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { ReunionEstatus } from 'src/app/shared/enums/reunion-estatus.enum';
import { Reunion } from 'src/app/shared/models/reunion.model';

@Component({
  selector: 'app-agregar-reunion',
  templateUrl: './agregar-reunion.component.html',
  styleUrls: ['./agregar-reunion.component.scss']
})
export class AgregarReunionComponent {
  reunionForm: FormGroup;


  constructor(private fb: FormBuilder, private reunionService: ReunionHttpService, private authService: AuthService, private router: Router) {
    this.reunionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      fecha_hora: ['', Validators.required],
      enlace: ['', [Validators.required, Validators.pattern('^https?://.+')]]
    });
  }

  guardarReunion() {
    if (this.reunionForm.valid) {
      const reunion: Reunion = {
        ...this.reunionForm.value,
        coordinadorId: this.authService.getIdFromToken(),
        estatus: ReunionEstatus.Pendiente
      };

      this.reunionService.create(reunion).subscribe(() => {
        this.router.navigate(['/reuniones']);
      });
    }
  }

  get titulo() {
    return this.reunionForm.get('titulo') || '';
  }

  get descripcion() {
    return this.reunionForm.get('descripcion') || '';
  }

  get fecha_hora() {
    return this.reunionForm.get('fecha_hora') || '';
  }

  get enlace() {
    return this.reunionForm.get('enlace') || '';
  }
}
