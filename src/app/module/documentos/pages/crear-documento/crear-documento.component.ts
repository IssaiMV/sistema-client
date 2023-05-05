import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DocumentoHttpService } from 'src/app/core/http/documentos/documentos.service';
import { Documento } from 'src/app/shared/models/documento.model';

@Component({
  selector: 'app-crear-documento',
  templateUrl: './crear-documento.component.html',
  styleUrls: ['./crear-documento.component.scss']
})
export class CrearDocumentoComponent {
  documentoForm: FormGroup;
  archivoSeleccionado!: File;

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoHttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.documentoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      archivo: ['', [Validators.required, this.fileSizeValidator(10485760)]]
    });
  }

  ngOnInit(): void { }

  get nombre() {
    return this.documentoForm.get('nombre');
  }

  get tipo() {
    return this.documentoForm.get('tipo');
  }

  get archivo() {
    return this.documentoForm.get('archivo');
  }

  async crearDocumento(): Promise<void> {
    const urlDocumento = await this.subirDocumento();
    if (urlDocumento) {

      const documento: Documento = {
        usuarioId: this.authService.getUserFromToken().id,
        nombre: this.documentoForm.get('nombre')!.value,
        tipo: this.documentoForm.get('tipo')!.value,
        ruta: urlDocumento,
        fecha_hora: new Date(),
      };

      this.documentoService.crearDocumento(documento).subscribe(() => {
        this.router.navigate(['/documentos']);
      });
    }
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  fileSizeValidator(maxSize: number) {
    return (control: any): { [key: string]: boolean } | null => {
      if (control.value.size > maxSize) {
        return { 'fileSize': true };
      }
      return null;
    };
  }

  subirDocumento(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.documentoService.subirDocumento(this.archivoSeleccionado).subscribe({
        next: (response: any) => {
          resolve(response.fileUrl);
        },
        error: (error) => {
          reject(undefined);
          alert(`Ha ocurrido un error al subir el documento: ${error}`);
        }
      })
    });
  }


}
