import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";
import {Subscription} from "rxjs";

import {AppBaseComponent} from "@core-app/utils";
import {ErrorMessage} from "@core-app/enums";
import {DocumentsService, AttachmentService, PopUpService} from "@core-app/services";

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
   * Documentos actuales de la solicitud para editar
   */
  @Input()
  public documentsRequest: Array<any>;

  /**
   * Formulario hijo de documentos
   */
  public attachmentForm: any;

  /**
   * Lista de documentos a subir
   */
  public listDocumentsToSaved: Array<any> = [];

  /**
   * Lista de archivos añadidos
   */
  public listDocumentSupports: Array<any> = [];

  /**
   * Subscripcion para el subject de professionalCard
   */
  public subscriptionProfessionalCard: Subscription;

  /**
   * Subscripcion para el subject de ValidationResolution
   */
  public subscriptionValidationResolution: Subscription;

  constructor(private controlContainer: ControlContainer,
              private popupAlert: PopUpService,
              private documentService: DocumentsService,
              private attachmentService: AttachmentService) {
    super();
  }


  ngOnInit(): void {
    this.attachmentForm = this.controlContainer.control;
    this.attachmentForm = this.attachmentForm.controls['attachmentForm'];

    this.listDocumentSupports = this.attachmentForm.get('documentSupports').value;

    //Valida si es una solicitud que ya trae documentos
    if (this.documentsRequest) {
      this.listDocumentsToSaved.push(...this.documentsRequest.filter(document => !document.is_valid));
      this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
      console.log("documentos a editar", this.listDocumentsToSaved)
    } else {

      this.listDocumentsToSaved = [
        {
          idDocumentType: 1,
          description: 'Documento de identificación'
        },
        {
          idDocumentType: 2,
          description: 'Título (Diploma de grado)'
        },
        {
          idDocumentType: 3,
          description: 'Acta de grado'
        }
      ];
      this.manageSubscriptions();
    }

  }

  /**
   * Maneja las subcripciones para los distintos estados de los archivos
   */
  private manageSubscriptions(): void {
    this.subscriptionProfessionalCard = this.attachmentService.showProfessionalCard.subscribe({
      next: value => {
        if (value) {
          if (!this.listDocumentsToSaved.find(x => x.idDocumentType == 4)) {
            this.listDocumentsToSaved.push({idDocumentType: 4, description: 'Tarjeta Profesional'});
            this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
          }
        } else if (this.listDocumentsToSaved.find(x => x.idDocumentType == 4)) {
          this.listDocumentsToSaved.splice(this.listDocumentsToSaved.findIndex(x => x.idDocumentType == 4), 1);
          this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
        }
      }
    });

    this.subscriptionValidationResolution = this.attachmentService.showValidationResolution.subscribe({
      next: value => {
        if (value) {
          if (!this.listDocumentsToSaved.find(x => x.idDocumentType == 5)) {
            this.listDocumentsToSaved.push({idDocumentType: 5, description: 'Resolución de convalidación'});
            this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
          }
        } else if (this.listDocumentsToSaved.find(x => x.idDocumentType == 5)) {

          this.listDocumentsToSaved.splice(this.listDocumentsToSaved.findIndex(x => x.idDocumentType == 5), 1);
          this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
        }
      }
    });
  }


  /**
   * Verifica si el archivo con determinado id ya se ha añadido
   * @param docTypeId Id del archivo a buscar
   * @returns Object si el archivo ya existe, undefined de lo contrario
   */
  public hasDocument(docTypeId: number) {
    return this.listDocumentSupports.find((file: any) => file.docTypeId == docTypeId);
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
  public addSelectedFile(event: any, docTypeId: number, docDescription: string, idDocumentTypeProcedureRequest: number): void {

    let archivos = event.target.files;
    const fileSelected = archivos[0];

    if (archivos.length > 1) {
      this.popupAlert.errorAlert(ErrorMessage.ONLY_ONE_DOCUMENT, 3000);
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      return;
    } else if (fileSelected && fileSelected.type != "application/pdf") {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.ONLY_PDF_DOCUMENT, 3000);
      return;
    } else if (fileSelected && fileSelected.size > 3000000) {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.MAX_3MB_DOCUMENT, 3000);
      return;
    }


    const idx = this.listDocumentSupports.findIndex(_file => _file.docTypeId == docTypeId);
    if (idx == -1) {
      this.listDocumentSupports.push({
        idDocumentTypeProcedureRequest,
        docTypeId,
        docDescription,
        content: fileSelected
      });
    } else {
      if (fileSelected) {
        this.listDocumentSupports[idx] = {
          idDocumentTypeProcedureRequest,
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
