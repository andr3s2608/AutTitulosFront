import {Component} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Componente encargado del formulario de registro de persona juridica
 */
@Component({
  selector: 'app-legal-person',
  templateUrl: './legal-person.component.html',
  styleUrls: ['./legal-person.component.scss']
})
export class LegalPersonComponent  extends  AppBaseComponent{

  /**
   * Cadena con mensaje inicial del formulario
   */
  public cadenaInicioRegistro: string;

  public legalForm: FormGroup;

  constructor(public fb: FormBuilder) {
    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en la Registro de Cámara de Comercio, estos\n" +
      "        datos serán usados para la generación de los Documentos asociados al trámite solicitado y su\n" +
      "        posterior reporte a entidades de vigilancia y control.";

    this.legalForm = this.fb.group({
      tipoIdedentificacion: [ '' , [ Validators.required ]],
      nit: [ '' , [ Validators.required ], Validators.pattern("^[0-9-]*$") ],
      razonsocial: [ '' , [ Validators.required ]],
      checkBoxDatosPersonales: [ '' , [ Validators.required, Validators.requiredTrue]]

    })

  }
  getErrorMessage(field: string): string {
    let message;
    switch (field) {
      case 'razonsocial':
        if (
          this.legalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.legalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'nit':
        if (
          this.legalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.legalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'checkBoxDatosPersonales':
        if ( this.legalForm?.get(field).hasError('required') && this.isTouchedField(this.legalForm, field)) {
          message = 'Debe marcar la casilla';
        } else if (this.legalForm?.get(field).hasError('requiredTrue') && this.isTouchedField(this.legalForm, field)) {
          message = 'Debe marcar la casilla';
        }
        break;

    }
    return message;
  }

}
