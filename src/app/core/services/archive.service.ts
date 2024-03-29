import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PopUpService} from "./popUp.service";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import Swal from "sweetalert2";

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
   * @param pathArchive Ruta del archivo
   */
  public viewArchiveActualWindow(pathArchive: string, fileBlob?: Blob): void {
    try
    {
      this.popupAlert.infoAlert('Cargando documento...', 4000);

      if (pathArchive == "") {
        window.open(window.URL.createObjectURL(fileBlob), '_blank');
      } else {
        const oidAndNameBlob: Array<string> = pathArchive.split("/")
        const contenedor: string = "aguahumanos";
        const oid: string = oidAndNameBlob[0]
        const nameBlob: string = oidAndNameBlob[1]+".pdf"

        this.http.get(`${PROCEDURE_BLOB_URI}/Storage/GetBlob/${contenedor}/${oid}/${nameBlob}`, { responseType: 'blob' })
          .subscribe((blob: Blob) => {
            document.querySelector("iframe").src = window.URL.createObjectURL(blob);
          });
      }

    } catch (e) {
      console.log(e)
      this.popupAlert.errorAlert(
        'Ocurrió un error al previsualizar el documento.',
        4000);
    }
  }

  /**
   * Permite visualizar un archivo en un pop up de sweet alert
   * @param pathArchive Ruta del archivo cuando existen en el contenedor blobStorage
   * @param fileBlob Blob a mostrar Cuando el archivo es temporal (para preeliminar)
   */
  public viewArchiveInPopUp(pathArchive: string, fileBlob?: Blob): void {
    try {
      this.popupAlert.infoAlert('Cargando documento...', 10000);

      if (pathArchive == "") {
        Swal.fire({
          title: 'Pdf',
          showCloseButton: true,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#3366CC',
          html: `<iframe src='${window.URL.createObjectURL(fileBlob)}' width="1300" height="700" title="visualizacion-documento">`,
          width: '75%',
        });
      } else {
        const oidAndNameBlob: Array<string> = pathArchive.split("/")
        const contenedor: string = "aguahumanos";
        const oid: string = oidAndNameBlob[0]
        const nameBlob: string = oidAndNameBlob[1]+".pdf"

        this.http.get(`${PROCEDURE_BLOB_URI}/Storage/GetBlob/${contenedor}/${oid}/${nameBlob}`, { responseType: 'blob' })
          .subscribe((blob: Blob) => {
            Swal.fire({
              title: 'Pdf',
              showCloseButton: true,
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#3366CC',
              html: `<iframe src='${window.URL.createObjectURL(blob)}' width="1300" height="700" title="visualizacion-documento">`,
              width: '75%',
            });
           // window.open(window.URL.createObjectURL(blob), '_blank');
          });
      }

    } catch (e) {
      console.log(e)
      this.popupAlert.errorAlert(
        'Ocurrió un error al previsualizar el documento.',
        4000);
    }
  }

  /**
   * Guarda un archivo en el contenedor/blob storage de la nube
   * En el contenedor aguahumanos
   * @param file Archivo a guardar
   * @param nameFile Nombre del archivo
   * @param oid Identificador que se quiere
   */
  public saveFileBlobStorage(file: Blob, nameFile: string, oid: string): Observable<any> {

    try {
      const fmData = new FormData();
      console.log("el tipo de dato es del file", typeof file);
      fmData.append('File', file);
      fmData.append('NameFile', nameFile);
      fmData.append('ContainerName', "aguahumanos");
      fmData.append('Oid', oid);
      return this.http.post(`${PROCEDURE_BLOB_URI}/Storage/AddFile`, fmData);

    } catch (e) {
      this.popupAlert.errorAlert("Ocurrió un error al subir los archivos.", 3000);
      return null;
    }

  }

  /**
   * Convierte un pdf en base64 a un File
   * @param base64
   * @param filename
   */
  public base64ToFile(base64: string, filename: string): File {

    try {
      base64 = `data:application/pdf;base64,${base64}`;
      const base64Arr = base64.split(',');
      const mime = base64Arr[0].match(/:(.*?);/)[1];
      const bstr = atob(base64Arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    } catch (e) {
      console.log("se daño el base64", e)
      return null;
    }

  }

}
