import {Component, OnInit} from '@angular/core';
import {ArchiveService, PopUpService} from "../../../../core/services";

@Component({
  selector: 'app-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrls: ['./attachment-viewer.component.scss']
})
export class AttachmentViewerComponent implements OnInit {


  /**
   * Archivos subidos por el ciudadano
   */
  public documentSupports: any[];

  /**
   * Icono de previsualizacion en la misma pantalla
   */
  public urlIconActualWindow: string;

  /**
   * Icono de previsualizacion en otra pestaña
   */
  public urlIconExternalWindow: string;

  constructor(private popupAlert: PopUpService,
              private archiveService: ArchiveService) {
    this.urlIconActualWindow = 'https://cdn-icons-png.flaticon.com/512/2889/2889358.png';
    this.urlIconExternalWindow = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
    this.documentSupports = [
      {
        nameDocument: 'Documento identidad',
        path: 'ruta'
      },
      {
        nameDocument: 'Titulo',
        path: 'ruta'
      },
      {
        nameDocument: 'Acta de grado',
        path: 'ruta'
      },
      {
        nameDocument: 'Tarjeta profesional asdadsdsaasdad saa dsasd',
        path: 'ruta'
      }
    ];
  }

  ngOnInit(): void {
  }


  /**
   * Permite visualizar el documento en la misma ventana
   * @param pathDocument
   */
  public visorWindowActualPdf(pathDocument: string): void {
    this.archiveService.viewArchiveActualWindow('./assets/binaries/listado.pdf');
  }

  /**
   * Permite visualizar el documento en una nueva pestaña
   * @param pathDocument
   */
  public visorWindowExternalPdf(pathDocument: string): void {
    this.archiveService.viewArchiveExternalWindow('./assets/binaries/listado.pdf');
  }

}
