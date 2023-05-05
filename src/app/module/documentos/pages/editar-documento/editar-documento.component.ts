import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DocumentoHttpService } from 'src/app/core/http/documentos/documentos.service';
import { Documento } from 'src/app/shared/models/documento.model';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.scss']
})
export class EditarDocumentoComponent {
  documentoForm: FormGroup;
  archivoSeleccionado!: File;
  documentoId!: number;

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoHttpService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.documentoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      archivo: ['', [Validators.required, this.fileSizeValidator(10485760)]]
    });
  }

  get nombre() {
    return this.documentoForm.get('nombre');
  }

  get tipo() {
    return this.documentoForm.get('tipo');
  }

  get archivo() {
    return this.documentoForm.get('archivo');
  }
  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id'));

    this.documentoService.getDocumento(this.documentoId)
      .subscribe((documento: Documento) => {
        this.documentoForm.patchValue(documento);
      });
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

  guardarDocumento() { }

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
