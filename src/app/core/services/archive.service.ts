import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * Service que permite descargar o ver archivos
 */
@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  public downloadArchive(routeArchive: string, nameSave:string, extension: string): void {
    this.http.get(routeArchive, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = nameSave+extension;
        link.click();
      });
  }
}
