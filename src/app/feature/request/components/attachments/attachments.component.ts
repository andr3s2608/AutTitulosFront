import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";
import {PopUpService} from "../../../../core/services";

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

  constructor(private controlContainer: ControlContainer,
              private popupAlert: PopUpService) {
    super();
    this.listDocumentsToSaved = [
      {
        id: 1,
        description: 'Documento de identificación'
      },
      {
        id: 2,
        description: 'Título (Diploma de grado)'
      },
      {
        id: 3,
        description: 'Acta de grado'
      },
      {
        id: 4,
        description: 'Tarjeta Profesional'
      }
    ];
  }


  ngOnInit(): void {
    this.attachmentForm = this.controlContainer.control;
    this.attachmentForm = this.attachmentForm.controls['attachmentForm'];

    this.attachmentForm.get('quantityDocuments').setValue(this.listDocumentsToSaved.length);
    this.listDocumentSupports = this.attachmentForm.get('documentSupports').value;
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

    if (archivos.length > 1) {
      this.popupAlert.errorAlert('Solo puedes agregar un archivo.', 3000);
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      return;
    }

    const fileSelected = archivos[0];

    if (fileSelected && fileSelected.type != "application/pdf") {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert('Formato no válido. Solo se admiten documentos en formato PDF.', 3000);
      return;
    }

    if (fileSelected && fileSelected.size > 3000000) {
      (<HTMLInputElement>document.getElementById(`inputDocument_${docTypeId}`)).value = '';
      this.popupAlert.errorAlert('El archivo escogido pesa más de 3Mb.', 3000);
      return;
    }


    const idx = this.listDocumentSupports.findIndex(_file => _file.docTypeId == docTypeId);
    if (idx == -1) {
      this.listDocumentSupports.push({
        docTypeId,
        content: fileSelected
      });
    } else {
      if (fileSelected) {
        this.listDocumentSupports[idx] = {
          docTypeId,
          content: fileSelected
        };
      } else {
        this.listDocumentSupports.splice(idx, 1);
      }
    }

    this.popupAlert.successAlert(`El archivo ${docDescription} fue cargado correctamente`, 2000);

  }


}
