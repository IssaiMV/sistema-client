import { Component } from '@angular/core';
import { EncuestaHttpService } from 'src/app/core/http/encuesta/encuesta.service';
import { Encuesta } from 'src/app/shared/models/encuesta.model';

@Component({
  selector: 'app-mostrar-encuestas',
  templateUrl: './mostrar-encuestas.component.html',
  styleUrls: ['./mostrar-encuestas.component.scss']
})
export class MostrarEncuestasComponent {
  encuestas: Encuesta[] = [];

  constructor(private encuestaService: EncuestaHttpService) { }

  ngOnInit(): void {
    this.encuestaService.getEncuestas().subscribe(encuestas => {
      this.encuestas = encuestas;
    });
  }

}
