import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { find } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { EncuestaHttpService } from 'src/app/core/http/encuesta/encuesta.service';
import { SemestreHttpService } from 'src/app/core/http/semestre/semestre.http.service';
import { UnidadDeAprendizajeHttpService } from 'src/app/core/http/unidade-de-aprendizaje/unidad.de.aprendizaje.http.service';
import { Encuesta } from 'src/app/shared/models/encuesta.model';
import { Grupo } from 'src/app/shared/models/grupo.model';
import { SemestreGrupo } from 'src/app/shared/models/semestre-grupo.model';
import { Semestre } from 'src/app/shared/models/semestre.model';
import { UnidadDeAprendizaje } from 'src/app/shared/models/unidad-de-aprendizaje.model';

@Component({
  selector: 'app-contestar-encuesta',
  templateUrl: './contestar-encuesta.component.html',
  styleUrls: ['./contestar-encuesta.component.scss']
})
export class ContestarEncuestaComponent {
  encuestaForm: FormGroup;
  semestres: Semestre[] = [];
  grupos: Grupo[] = [];
  unidades: UnidadDeAprendizaje[] = [];
  semestreGrupos: SemestreGrupo[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private encuestaService: EncuestaHttpService,
    private semestreService: SemestreHttpService,
    private unidadService: UnidadDeAprendizajeHttpService,
    private router: Router
  ) {
    this.encuestaForm = this.fb.group({
      cantidadAlumnos: ['', Validators.required],
      cantidadAprobados: ['', Validators.required],
      cantidadReprobados: ['', Validators.required],
      observaciones: [''],
      semestre: ['', Validators.required],
      grupo: ['', Validators.required],
      unidadDeAprendizaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.semestreService.getAll().subscribe((semestres: Array<Semestre>) => {
      this.semestres = semestres;
    });
    this.unidadService.getAll().subscribe((unidades: Array<UnidadDeAprendizaje>) => {
      this.unidades = unidades;
    });
  }
  get cantidadAlumnos() {
    return this.encuestaForm.get('cantidadAlumnos');
  }

  get cantidadAprobados() {
    return this.encuestaForm.get('cantidadAprobados');
  }

  get cantidadReprobados() {
    return this.encuestaForm.get('cantidadReprobados');
  }

  get observaciones() {
    return this.encuestaForm.get('observaciones');
  }

  get semestre() {
    return this.encuestaForm.get('semestre');
  }

  get grupo() {
    return this.encuestaForm.get('grupo');
  }

  get unidadDeAprendizaje() {
    return this.encuestaForm.get('unidadDeAprendizaje');
  }

  onSubmit(): void {
    if (this.encuestaForm.invalid) {
      return;
    }
    const encuesta: Encuesta = {
      ...this.encuestaForm.value,
      unidadDeAprendizajeId: this.unidadDeAprendizaje?.value,
      semestreGrupoId: this.buscarSemestreGrupoId(parseInt(this.semestre?.value), parseInt(this.grupo?.value)),
      usuarioId: this.authService.getIdFromToken()
    };
    console.log(encuesta);
    this.encuestaService.addEncuesta(encuesta).subscribe({
      next: (res) => {
        this.router.navigate(['/encuestas']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSemestreChange(): void {
    const semestre = this.semestre?.value;
    this.semestreService.getAllGrupos(semestre).subscribe({
      next: (semestreGrupos: Array<SemestreGrupo>) => {
        this.grupos = semestreGrupos.map((semestreGrupo: SemestreGrupo) => semestreGrupo.grupo);
        this.semestreGrupos = semestreGrupos;
      }
    })
  }

  buscarSemestreGrupoId(semestreId: number, grupoId: number): number | undefined {
    return this.semestreGrupos.find((semestreGrupo: SemestreGrupo) => semestreGrupo.grupoId === grupoId && semestreGrupo.semestreId === semestreId)?.id;
  }

}

