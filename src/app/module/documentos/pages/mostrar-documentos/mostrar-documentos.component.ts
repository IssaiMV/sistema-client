import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DocumentoHttpService } from 'src/app/core/http/documentos/documentos.service';
import { Documento } from 'src/app/shared/models/documento.model';

@Component({
  selector: 'app-mostrar-documentos',
  templateUrl: './mostrar-documentos.component.html',
  styleUrls: ['./mostrar-documentos.component.scss']
})
export class MostrarDocumentosComponent {
  documentos: Documento[] = [];
  esProfesor: boolean;

  constructor(
    private documentoService: DocumentoHttpService,
    private authService: AuthService
  ) {
    this.esProfesor = authService.isProfesor()
  }

  ngOnInit(): void {
    this.documentoService.getDocumentos().subscribe((documentos) => {
      this.documentos = documentos;
      if (this.esProfesor) {
        this.documentos.filter((documento: Documento) => documento.usuarioId === this.authService.getUserFromToken().id)
      }
    });
  }

  descargarDocumento(documento: Documento): void {
    window.open(`http://localhost:3000/download/${documento.ruta}`, '_blank');
  }

  eliminarDocumento(documento: Documento): void {
    if (confirm(`¿Está seguro que desea eliminar el documento ${documento.nombre}?`)) {
      if (documento.id) {
        this.documentoService.eliminarDocumento(documento.id)
          .subscribe(() => {
            this.documentos = this.documentos.filter(doc => doc.id !== documento.id);
          });
      }
    }
  }

}
