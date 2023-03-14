import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.scss']
})
export class RequestDataComponent extends AppBaseComponent implements OnInit {

  /**
   * Formulario hijo de la informacion de la solicitud
   */
  public requestDataForm: any;

  constructor(private controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    this.requestDataForm = this.controlContainer.control;
    this.requestDataForm = this.requestDataForm.controls['requestDataForm'];
  }


  /**
   * Devuelve un mensaje de validacion de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let esRequerido = "Es requerido";
    let soloNumeros = "Solo se admiten numeros";
    let fechaErronea = "La fecha no puede ser una fecha futura o superior a la de hoy";

    let message;
    switch (field) {
      case 'titleTypeId':
        if (this.requestDataForm?.get(field).hasError('required') && this.isTouchedField(this.requestDataForm, field)) {
          message = esRequerido;
        }
        break;
      case 'instituteId':
        if (this.requestDataForm?.get(field).hasError('required') && this.isTouchedField(this.requestDataForm, field)) {
          message = esRequerido;
        }
        break;
      case 'professionId':
        if (this.requestDataForm?.get(field).hasError('required') && this.isTouchedField(this.requestDataForm, field)) {
          message = esRequerido;
        }
        break;
      case 'diplomaNumber':
        if (this.requestDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.requestDataForm, field)) {
          message = soloNumeros;
        }
        break;
      case 'endDate':
        if (this.requestDataForm?.get(field).hasError('required') && this.isTouchedField(this.requestDataForm, field)) {
          message = esRequerido;
        } else if (this.requestDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.requestDataForm, field)) {
          message = fechaErronea;
        }
        break;
      case 'yearTitle':
        if (this.requestDataForm?.get(field).hasError('required') && this.isTouchedField(this.requestDataForm, field)) {
          message = esRequerido;
        } else if (this.requestDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.requestDataForm, field)) {
          message = soloNumeros;
        } else if (this.requestDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.requestDataForm, field)) {
          message = "Debe tener mínimo 4 caracteres";
        } else if (this.requestDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.requestDataForm, field)) {
          message = "Debe tener máximo 4 caracteres";
        }
        break;

    }
    return message;
  }
}
