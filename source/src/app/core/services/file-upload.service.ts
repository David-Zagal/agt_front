import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
import { Documento, Documentum } from '../models/services/request/documentum.model';
import { ToastService } from './toast.service';
import { ResponseDocumentum } from '../models/services/response/response-documentum.model';
import { constantes } from '../common/constantes';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url: string;

  constructor(private http: HttpClient, private restService: RestService, private toastService: ToastService) { }

  crearDocumento(documentum: Documentum) {
    return this.restService.post(environment.apiRestJava + constantes.endpoints.createFileDocumentum, documentum)
      .pipe(map((res: any) => res));
  }

  subirDocumento(file: File, documentum: Documentum) {
    const formData: FormData = new FormData();

    formData.append('idRepositorio', documentum.idRepositorio);
    formData.append('idDocumento', documentum.documento.idDocumento);
    formData.append('file', file);
    return this.restService.post(environment.apiRestJava + constantes.endpoints.uploadFileDocumentum, formData)
      .pipe(map((res: any) => res));
  }

  deleteFile(documentum: Documentum) {
    this.restService.post(environment.apiRestJava + constantes.endpoints.deleteFileDocumentum, documentum)
      .subscribe((res: ResponseDocumentum) => {
        if (res.codigo === '0000') {
          this.toastService.addSingle('success', '', res.restResponse, true);
        } else {
          this.toastService.addSingle('warn', '', 'Código: ' + res.codigo + ': ' + res.descripcion, true);
        }
      });
  }

  /*consultaDocumento(documentum: Documentum): Observable<any> {
    return this.restService.post(environment.apiRestJava + environment.endpoints.consultaFileDocumentum, documentum)
    .pipe(map((res: any) => res));
  }*/

  getFile(documentum: Documento): Observable<any> {
    return this.restService.postBlob(environment.apiRestJava
      + constantes.endpoints.getFileDocumentum, documentum);
  }

  public formatBytes(bytes, decimals = 2) {
    if (bytes === 0) { return '0 bytes'; }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  abrirArchivo(documento) {
    this.url = window.URL.createObjectURL(documento.body);
    const a: any = document.createElement('a');
    a.href = this.url;
    a.download = documento.headers.get('content-disposition').split('=')[1];
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

  visualizarDocumento(files, descriptor) {
    const existe = files.find(file => file.file.name === descriptor);
    if (existe) {
      this.url = window.URL.createObjectURL(existe.file);
      const a: any = document.createElement('a');
      a.href = this.url;
      a.download = descriptor;
      document.body.appendChild(a);
      a.style = 'display: none';
      a.click();
      a.remove();
    } else {
      const documentum: Documento = new Documento();
      documentum.idDocumento = descriptor;
      documentum.idRepositorio = 'DOCPRE_DCORE';

      this.getFile(documentum).subscribe((res: HttpResponse<Blob>) => {
        this.abrirArchivo(res);
      });

    }
  }
}
