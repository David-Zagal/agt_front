import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Documento, Documentum } from '../../core/models/services/request/documentum.model';
import { FicheroDocumentun } from '../../core/models/services/request/fichero-documentum.model';
import { ResponseDocumentum } from '../../core/models/services/response/response-documentum.model';
import { FileUploadService } from '../../core/services/file-upload.service';

@Component({
  selector: 'app-documentum',
  templateUrl: './documentum.component.html',
  styleUrls: ['./documentum.component.css']
})
export class DocumentumComponent implements OnInit {
  idImagen: SafeUrl;
  ficheros: any[] = [];
  display: boolean;
  newFichero: any;
  selectedFiles: any;
  ficheroForm: FormGroup;
  files: any[] = [];
// NO ESTA MUY FINO EL COMPONENTE, FALTAN COSILLAS POR DEPURAR
  constructor(private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarImagenesTareas();

    this.ficheroForm = this.fb.group({
      'denominacionFichero': new FormControl('', Validators.required),
      'descriptorFichero': new FormControl('', Validators.required)
    });
  }

  cargarImagenesTareas() {
    const documentum: Documento = new Documento();
    documentum.idDocumento = '09003acc800186e0'; // Esta imagen peude no existir
    documentum.idRepositorio = 'DOCPRE_DCORE';

    this.fileUploadService.getFile(documentum).subscribe((res = ResponseDocumentum) => {
      this.idImagen = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res.body));
    }, err => {
      this.idImagen = 'null';
    });
  }

  consultarDocumentos() {

  }

  showDialog() {
    this.display = true;
    this.newFichero = new Documento;
  }

  myUploader(event, form) {
    this.selectedFiles = event.files;
    this.ficheroForm.patchValue({
      descriptorFichero: event.files[0].name
    });
    form.clear();
  }

  aniadirFichero(form) {
    this.selectedFiles.forEach(file => {
      const documento: FicheroDocumentun = new FicheroDocumentun;
      documento.file = file;
      documento.descripcion = this.ficheroForm.value.denominacionFichero;
      this.files.push(documento);
      this.newFichero.tam_archivo = this.fileUploadService.formatBytes(file.size);
      this.newFichero.tipo_mime = file.type;
    });

    this.selectedFiles = [];
    this.newFichero.nombre = this.ficheroForm.value.denominacionFichero;
    this.newFichero.id = this.ficheroForm.value.descriptorFichero;
    this.ficheros.push(this.newFichero);

    this.display = false;
    this.ficheroForm.reset();
    form.uploadedFileCount = 0;
  }

  deleteFichero(i, number, descriptor) {
    let existe = this.files.find(file => file.file.name == descriptor);

    if (existe) {
      this.files = this.files.filter(file => file.file.name !== descriptor);
    } else {
      this.fileUploadService.deleteFile(descriptor);
    }
  }
}
