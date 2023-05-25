import {Component, Input} from '@angular/core';
import {ControlContainer} from "@angular/forms";

import {AppBaseComponent} from "@core-app/utils";
import {PopUpService} from "@core-app/services";
import {ErrorMessage} from "@core-app/enums";

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


  @Input()
  public infoRequest: any;

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
    return this.clarificationForm.get('fileSupport').value != null;
  }

  /**
   * Elimina un archivo añadido
   */
  public removeFileAdded(elementId: string): void {
    (<HTMLInputElement>document.getElementById(elementId)).value = '';
    this.clarificationForm.get('fileSupport').value = null;
  }

  /**
   * Añade o reemplaza el archivo
   * @param event Evento del input tipo file
   */
  public addSelectedFile(event: any, elementId: string): void {

    let archivos = event.target.files;
    const fileSelected = archivos[0];

    if (archivos.length > 1) {
      (<HTMLInputElement>document.getElementById(elementId)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.ONLY_ONE_DOCUMENT, 3000);
      return;
    }
    else if (fileSelected && fileSelected.type != "application/pdf") {
      (<HTMLInputElement>document.getElementById(elementId)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.ONLY_PDF_DOCUMENT, 3000);
      return;
    }
    else if (fileSelected && fileSelected.size > 3000000) {
      (<HTMLInputElement>document.getElementById(elementId)).value = '';
      this.popupAlert.errorAlert(ErrorMessage.MAX_3MB_DOCUMENT, 3000);
      return;
    }

    const fileSoporte = fileSelected || null;
    this.clarificationForm.patchValue({
      fileSupport: fileSoporte
    });
    this.popupAlert.successAlert('El archivo fue cargado correctamente', 2000);
  }

  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['filedNumber', 'titleTypeId', 'reasonTypeId', 'observation'];

    if (required.includes(field) && this.isTouchedField(this.clarificationForm, field)
      && this.clarificationForm?.get(field).hasError('required')) {
        message = ErrorMessage.IS_REQUIRED;
    }

    return message;
  }

}
