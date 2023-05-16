import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { EncuestaHttpService } from 'src/app/core/http/encuesta/encuesta.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listaDificultadesPorGrupo: Array<any> = [];
  isCoordinador: boolean = false;
  constructor(
    private encuestaService: EncuestaHttpService,
    private authService: AuthService
  ) {
    this.isCoordinador = authService.isCoordinador()
  }

  ngOnInit() {
    this.encuestaService.getGraficas().subscribe((response: any) => {
      this.obtenerGraficaReprobadorPorMateria(response.reprobadosPorUnidad);
      this.obtenerGraficaReprobadorPorProfesor(response.reprobadosPorProfesor);
      this.obtenerGraficaProblematicasGrupo(response.problematicasPorEncuesta);
      this.obtenerListaDificultadesPorGrupo(response.dificultadesPorGrupo)
    })
  }

  obtenerGraficaReprobadorPorMateria(datos: any[]) {
    const etiquetas = datos.map((dato) => dato.unidad);
    const valores = datos.map((dato) => dato.reprobados);
    this.crearGrafica('reprobadosPorUnidadDeAprendizaje', 'Alumnos Reprobados por unidad de aprendizaje', etiquetas, valores);

  }
  obtenerGraficaReprobadorPorProfesor(datos: any[]) {
    const etiquetas = datos.map((dato) => dato.maestros);
    const valores = datos.map((dato) => dato.reprobados);
    this.crearGrafica('reprobadosPorProfesor', 'Alumnos Reprobados por profesor', etiquetas, valores);
  }
  obtenerGraficaProblematicasGrupo(datos: any[]) {
    const etiquetas = datos.map((dato) => dato.problematicas);
    const valores = datos.map((dato) => dato.cantidad);
    console.log(etiquetas, valores);
    this.crearGrafica('problematicasGrupo', 'Problematicas por grupo', etiquetas, valores);
  }
  obtenerListaDificultadesPorGrupo(datos: any[]) {
    this.listaDificultadesPorGrupo = datos;
    if (this.listaDificultadesPorGrupo.length > 0) {
      this.listaDificultadesPorGrupo.forEach(item => item['isAccordionOpen'] = false);
      this.listaDificultadesPorGrupo[0].isAccordionOpen = true;
    }
  }

  crearGrafica(chart: string, title: string, tags: string[], values: string[]) {
    new Chart(chart, {
      type: 'pie',
      data: { labels: tags, datasets: [{ label: title, data: values }], },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

}
