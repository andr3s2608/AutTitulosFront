import {Component, OnInit} from '@angular/core';
import {ArchiveService, PopUpService} from "../../../../core/services";
import {ControlContainer} from "@angular/forms";
import {DocumentsService} from "../../../../core/services/documents.service";

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
   * Formulario padre para controlar el estado de los documentos
   */
  public attachmentform: any;

  /**
   * Icono de previsualizacion en la misma pantalla
   */
  public readonly urlIconActualWindow: string = 'https://cdn-icons-png.flaticon.com/512/2889/2889358.png';

  /**
   * Icono de previsualizacion en otra pestaña
   */
  public readonly urlIconExternalWindow: string = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';

  constructor(private popupAlert: PopUpService,
              public archiveService: ArchiveService,
              private documentService: DocumentsService, private controlContainer: ControlContainer) {

    this.documentService.getDocumentsByIdRequest(localStorage.getItem('procedure')).subscribe(resp => {

      this.documentSupports = resp.data;
  this.attachmentform.get('documentstate').setValue(this.documentSupports );

    });

  }

  ngOnInit(): void {
    this.attachmentform = this.controlContainer.control;
    this.attachmentform = this.attachmentform.controls['attachmentform'];
  }

  public statechange(id: number): void {

    for (const element of this.documentSupports) {
      if (element.idDocumentTypeProcedureRequest == id) {
        element.is_valid = !element.is_valid;
        this.attachmentform.get('documentstate').setValue(this.documentSupports );
        break;
      }
    }
  }

}
