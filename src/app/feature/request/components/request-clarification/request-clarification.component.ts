import { Component } from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";
import {PopUpService} from "../../../../core/services";

@Component({
  selector: 'app-request-clarification',
  templateUrl: './request-clarification.component.html',
  styleUrls: ['./request-clarification.component.scss']
})
export class RequestClarificationComponent extends AppBaseComponent {

  /**
   * Formulario hijo de la solicitud de aclaracion
   */
  public clarificationForm: any;

  constructor(private controlContainer: ControlContainer,
              private popupAlert: PopUpService) {
    super();
  }

  ngOnInit(): void {
    this.clarificationForm = this.controlContainer.control;
    this.clarificationForm = this.clarificationForm.controls['clarificationForm'];

  }

  /**
   * Verifica si ya se ha cargado un documento
   * @returns True si el archivo ya se ha cargado, false de lo contrario
   */
  public hasDocument() {
    return this.clarificationForm.get('fileSupport').value == '';
  }

  /**
   * Elimina un archivo añadido
   */
  public removeFileAdded(): void {
    (<HTMLInputElement>document.getElementById(`inputSupportClarification`)).value = '';
    this.clarificationForm.get('fileSupport').value = '';
  }

  /**
   * Añade o reemplaza el archivo
   * @param event Evento del input tipo file
   */
  public addSelectedFile(event: any): void {

    let archivos = event.target.files;

    if (archivos.length > 1) {
      this.popupAlert.errorAlert('Solo puedes agregar un archivo.', 3000);
      (<HTMLInputElement>document.getElementById(`inputSupportClarification`)).value = '';
      return;
    }

    const fileSelected = archivos[0];

    if (fileSelected && fileSelected.type != "application/pdf") {
      (<HTMLInputElement>document.getElementById(`inputSupportClarification`)).value = '';
      this.popupAlert.errorAlert('Formato no válido. Solo se admiten documentos en formato PDF.', 3000);
      return;
    }

    if (fileSelected && fileSelected.size > 3000000) {
      (<HTMLInputElement>document.getElementById(`inputSupportClarification`)).value = '';
      this.popupAlert.errorAlert('El archivo escogido pesa más de 3Mb.', 3000);
      return;
    }


    const fileSoporte = event.target.files[0] || null;
    this.clarificationForm.patchValue({
      fileSupport: fileSoporte
    });
    this.popupAlert.successAlert('El archivo fue cargado correctamente', 2000);

  }

  public getErrorMessage(field: string): string {
    let esRequerido = "Es requerido";

    let message;
    switch (field) {
      case 'filedNumber':
        if (this.clarificationForm?.get(field).hasError('required') && this.isTouchedField(this.clarificationForm, field)) {
          message = esRequerido;
        }
        break;
      case 'titleTypeId':
        if (this.clarificationForm?.get(field).hasError('required') && this.isTouchedField(this.clarificationForm, field)) {
          message = esRequerido;
        }
        break;
      case 'reasonTypeId':
        if (this.clarificationForm?.get(field).hasError('required') && this.isTouchedField(this.clarificationForm, field)) {
          message = esRequerido;
        }
        break;
      case 'observation':
        if (this.clarificationForm?.get(field).hasError('required') && this.isTouchedField(this.clarificationForm, field)) {
          message = esRequerido;
        }
        break;
    }
    return message;
  }

}
