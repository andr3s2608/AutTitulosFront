import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";

import {AppBaseComponent} from "@core-app/utils";

@Component({
  selector: 'app-edit-attachments',
  templateUrl: './edit-attachments.component.html',
  styleUrls: ['./edit-attachments.component.scss']
})
export class EditAttachmentsComponent extends AppBaseComponent implements OnInit {

  /**
   * Documentos actuales de la solicitud
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

  constructor(private controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    this.attachmentForm = this.controlContainer.control;
    this.attachmentForm = this.attachmentForm.controls['attachmentForm'];

    this.listDocumentSupports = this.attachmentForm.get('documentSupports').value;

    this.listDocumentsToSaved.push(...this.documentsRequest.filter(document => !document.is_valid));
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


}
