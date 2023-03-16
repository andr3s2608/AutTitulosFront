import {Component, OnInit} from '@angular/core';
import {ArchiveService, PopUpService} from "../../../../core/services";

/**
 * Component que permite visualizar documentos cargados en el trámite
 */
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
  public readonly urlIconActualWindow: string = 'https://cdn-icons-png.flaticon.com/512/2889/2889358.png';

  /**
   * Icono de previsualizacion en otra pestaña
   */
  public readonly urlIconExternalWindow: string = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';

  constructor(private popupAlert: PopUpService,
              private archiveService: ArchiveService) {
    this.documentSupports = [
      {
        nameDocument: 'Documento identidad',
        path: './assets/binaries/listado.pdf'
      },
      {
        nameDocument: 'Titulo',
        path: './assets/binaries/listado.pdf'
      },
      {
        nameDocument: 'Acta de grado',
        path: './assets/binaries/listado.pdf'
      },
      {
        nameDocument: 'Tarjeta profesional asdadsdsaasdad saa dsasd',
        path: './assets/binaries/listado.pdf'
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
    this.archiveService.viewArchiveActualWindow(pathDocument);
  }

  /**
   * Permite visualizar el documento en una nueva pestaña
   * @param pathDocument
   */
  public visorWindowExternalPdf(pathDocument: string): void {
    this.archiveService.viewArchiveExternalWindow(pathDocument);
  }

}
