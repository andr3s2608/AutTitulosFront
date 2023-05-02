import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";

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

  public listInstitutes: any[];

  public listProfessions: any[];

  constructor(private controlContainer: ControlContainer) {
    super();
    this.listInstitutes = [
      {
        id: 1,
        nombre: "UNIVERSIDAD 1"
      },
      {
        id: 2,
        nombre: "UNIVERSIDAD 2"
      },
      {
        id: 3,
        nombre: "UNIVERSIDAD 3"
      }
    ];

    this.listProfessions = [
      {
        id: 1,
        nombre: "TECNICO 1"
      },
      {
        id: 2,
        nombre: "TECNOLOGO 2"
      },
      {
        id: 3,
        nombre: "PROFESIONAL 3"
      }
    ]

  }

  ngOnInit(): void {
    this.requestDataForm = this.controlContainer.control;
    this.requestDataForm = this.requestDataForm.controls['requestDataForm'];
  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['titleTypeId', 'instituteId', 'professionId', 'endDate', 'yearTitle'];
    const onlyNumber: Array<string> = ['diplomaNumber', 'yearTitle'];
    const dateError: Array<string> = ['endDate', 'yearTitle'];

    if (this.isTouchedField(this.requestDataForm, field)) {

      if (required.includes(field) && this.requestDataForm?.get(field).hasError('required') ) {
        message = ErrorMessage.IS_REQUIRED;
      }
      else if (onlyNumber.includes(field) && this.requestDataForm?.get(field).hasError('pattern') ) {
        message = ErrorMessage.ONLY_NUMBERS;
      }
      else if (dateError.includes(field) && this.requestDataForm?.get(field).hasError('invalidDate') ) {
        message = ErrorMessage.NO_FUTURE_DATE;
      }
      else if (field == 'yearTitle') {
        if (this.requestDataForm?.get(field).hasError('minlength') ) {
          message = "Debe tener mínimo 4 caracteres";
        } else if (this.requestDataForm?.get(field).hasError('maxlength')) {
          message = "Debe tener máximo 4 caracteres";
        }
      }

    }

    return message;
  }

}
