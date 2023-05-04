import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PopUpService} from "./popUp.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const { PROCEDURE_BLOB_URI } = environment;

/**
 * Service que permite descargar o ver archivos
 */
@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient,
              private popupAlert: PopUpService) { }


  /**
   * Permite descargar un archivo enviado por parametro
   * @param routeArchive Ruta del archivo a descargar
   * @param nameSave Nombre con que se quiere descargar
   * @param extension Extension del archivo que se quiere descargar
   */
  public downloadArchive(routeArchive: string, nameSave:string, extension: string): void {

    try {
      this.popupAlert.infoAlert(
        'Cargando documento...',
        4000);

      this.http.get(routeArchive, { responseType: 'blob' })
        .subscribe((blob: Blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = nameSave+extension;
          link.click();
        });

    } catch (e) {
      this.popupAlert.errorAlert(
        'Ocurrió un error al descargar el documento.',
        4000);
    }

  }

  /**
   * Permite visualizar un archivo en un iframe de una ventana actual
   * @param routeArchive Ruta del archivo
   */
  public viewArchiveActualWindow(routeArchive: string): void {
    try
    {
      this.popupAlert.infoAlert(
        'Cargando documento...',
        4000);

      this.http.get(routeArchive, { responseType: 'blob' })
        .subscribe((blob: Blob) => {
          document.querySelector("iframe").src = window.URL.createObjectURL(blob);
        });

    } catch (e) {
      console.log(e)
      this.popupAlert.errorAlert(
        'Ocurrió un error al previsualizar el documento.',
        4000);
    }
  }

  /**
   * Permite visualizar un archivo en una pestaña nueva
   * @param routeArchive Ruta del archivo
   */
  public viewArchiveExternalWindow(routeArchive: any): void {
    try
    {
      this.popupAlert.infoAlert(
        'Cargando documento...',
        4000);

      this.http.get(routeArchive, { responseType: 'blob' })
        .subscribe((blob: Blob) => {
          window.open(window.URL.createObjectURL(blob), '_blank');
        });

    } catch (e) {
      console.log(e)
      this.popupAlert.errorAlert(
        'Ocurrió un error al previsualizar el documento.',
        4000);
    }
  }

  public saveFileBlobStorage(data: FormData): Observable<any> {
    return this.http.post(`${PROCEDURE_BLOB_URI}Storage/AddFile`, data);
  }
}
