import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";
import {PopUpService} from "../../../../core/services";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";
import {DocumentsService} from "../../../../core/services/documents.service";
import {Subscription} from "rxjs";
import {AttachmentService} from "../../../../core/services/attachment.service";

/**
 * Componente encargado de los documentos de la solicitud
 */
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent extends AppBaseComponent implements OnInit {


  /**
   * Formulario hijo de documentos
   */
  public attachmentForm: any;

  /**
   * Lista de documentos a subir
   */
  public listDocumentsToSaved: any[];

  /**
   * Lista de archivos añadidos
   */
  public listDocumentSupports: any[];

  /**
   * Subscripcion para el subject de professionalCard
   */
  public subscriptionProfessionalCard: Subscription;

  constructor(private controlContainer: ControlContainer,
              private popupAlert: PopUpService,
              private documentService: DocumentsService,
              private attachmentService: AttachmentService) {
    super();
    this.listDocumentsToSaved = [
      {
        IdDocumentType: 1,
        description: 'Documento de identificación'
      },
      {
        IdDocumentType: 2,
        description: 'Título (Diploma de grado)'
      },
      {
        IdDocumentType: 3,
        description: 'Acta de grado'
      }
    ];
  }


  ngOnInit(): void {
    this.attachmentForm = this.controlContainer.control;
    this.attachmentForm = this.attachmentForm.controls['attachmentForm'];

    this.listDocumentSupports = this.attachmentForm.get('documentSupports').value;

    this.subscriptionProfessionalCard = this.attachmentService.showProfessionalCard.subscribe({
      next: value => {
        if (value) {
          this.listDocumentsToSaved.push({ IdDocumentType: 4, description: 'Tarjeta Profesional'});
          this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
        } else if(this.listDocumentsToSaved[3]) {
          this.listDocumentsToSaved.splice(3, 1);
          this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
        }
      }
    })
  }


  /**
   * Verifica si el archivo con determinado id ya se ha añadido
   * @param docTypeId Id del archivo a buscar
   * @returns Object si el archivo ya existe, undefined de lo contrario
   */
  public hasDocument(docTypeId: number) {
    return this.listDocumentSupports.find((file:any) => file.docTypeId == docTypeId);
  }


  /**
   * Elimina un archivo añadido
   * @param docTypeId TypeId del archivo a eliminar
   */
  public removeFileAdded(docTypeId: number): void {
    const idx = this.listDocumentSupports.findIndex(_file => _file.docTypeId == docTypeId);
    if (idx != -1) {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.listDocumentSupports.splice(idx, 1);
    }
  }


  /**
   * Añade o reemplaza un archivo a la lista
   * @param event Evento del input tipo file
   * @param docTypeId TypeId con el que va a quedar el archivo
   */
  public addSelectedFile(event: any, docTypeId: number, docDescription: string): void {

    let archivos = event.target.files;
    const fileSelected = archivos[0];

    if (archivos.length > 1) {
      this.popupAlert.errorAlert(ErrorMessage.ONLY_ONE_DOCUMENT, 3000);
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      return;
    }
    else if (fileSelected && fileSelected.type != "application/pdf") {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.ONLY_PDF_DOCUMENT, 3000);
      return;
    }
    else if (fileSelected && fileSelected.size > 3000000) {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.MAX_3MB_DOCUMENT, 3000);
      return;
    }


    const idx = this.listDocumentSupports.findIndex(_file => _file.docTypeId == docTypeId);
    if (idx == -1) {
      this.listDocumentSupports.push({
        docTypeId,
        docDescription,
        content: fileSelected
      });
    } else {
      if (fileSelected) {
        this.listDocumentSupports[idx] = {
          docTypeId,
          docDescription,
          content: fileSelected
        };
      } else {
        this.listDocumentSupports.splice(idx, 1);
      }
    }

    this.popupAlert.successAlert(`El archivo ${docDescription} fue cargado correctamente.`, 2000);

  }


}
