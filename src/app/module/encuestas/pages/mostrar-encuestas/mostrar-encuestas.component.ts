import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { EncuestaHttpService } from 'src/app/core/http/encuesta/encuesta.service';
import { UserService } from 'src/app/core/service/user.service';
import { Encuesta } from 'src/app/shared/models/encuesta.model';

@Component({
  selector: 'app-mostrar-encuestas',
  templateUrl: './mostrar-encuestas.component.html',
  styleUrls: ['./mostrar-encuestas.component.scss']
})
export class MostrarEncuestasComponent {
  encuestas: Encuesta[] = [];
  esProfesor: boolean;
  esPropietario: boolean = true;

  constructor(
    private encuestaService: EncuestaHttpService,
    private authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,

  ) {
    this.esProfesor = authService.isProfesor()
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.encuestaService.getEncuestas().subscribe(encuestas => {
      this.encuestas = encuestas;

      if (id === 0) {
        this.encuestas = this.encuestas.filter((encuenta: Encuesta) => encuenta.usuarioId === this.authService.getIdFromToken())
      } else {
        this.esPropietario = false;
        this.encuestas = this.encuestas.filter((encuenta: Encuesta) => encuenta.usuarioId === id)
      }
    });
  }
}
