import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ReunionHttpService } from 'src/app/core/http/reuniones/reuniones.service';
import { ReunionEstatus } from 'src/app/shared/enums/reunion-estatus.enum';
import { Reunion } from 'src/app/shared/models/reunion.model';

@Component({
  selector: 'app-editar-reunion',
  templateUrl: './editar-reunion.component.html',
  styleUrls: ['./editar-reunion.component.scss']
})
export class EditarReunionComponent {
  reunion: Reunion | undefined;
  id: any = 0;
  reunionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reunionService: ReunionHttpService,
    private route: ActivatedRoute, private router: Router,
    private authService: AuthService
  ) {
    this.reunionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      fecha_hora: ['', Validators.required],
      enlace: ['', [Validators.required, Validators.pattern('^https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.reunionService.get(parseInt(this.id)).subscribe(reunion => {
        this.reunion = reunion;
        this.reunionForm.patchValue(reunion);
      });
  }

  guardarReunion() {
    if (this.reunionForm.valid) {
      const reunion: Reunion = {
        ...this.reunionForm.value,
        coordinadorId: this.authService.getIdFromToken(),
        estatus: ReunionEstatus.Realizada
      };

      this.reunionService.update(this.id, reunion).subscribe(() => {
        this.router.navigate(['/reuniones']);
      });
    }
  }
}
