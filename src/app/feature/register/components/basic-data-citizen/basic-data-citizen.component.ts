import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService} from "../../../../core/services";
import {RegisterService} from "../../../../core/services/register.service";


@Component({
  selector: 'app-basic-data-citizen',
  templateUrl: './basic-data-citizen.component.html',
  styleUrls: ['./basic-data-citizen.component.scss']
})
export class BasicDataCitizenComponent extends AppBaseComponent implements OnInit {

  /**
   * Formulario reactivo de los Datos basicos
   */
  public basicDataForm:any;

  /**
   * Lista de tipos de identificación
   */
  public identificationType: any[];


  constructor(public fb: FormBuilder,
              public cityService: CityService,
              private controlContainer: ControlContainer,
              private registerService: RegisterService)
  {
    super();
  }

  ngOnInit(): void {
    this.basicDataForm = this.controlContainer.control;
    this.basicDataForm = this.basicDataForm.controls['basicDataForm'];
    this.registerService.getIdentificationType().subscribe(resp => this.identificationType = resp.data);
  }

  /**
   * Retorna el mensaje de error del campo del formulario recibido
   * @param field Campo a validar
   */
  getErrorMessage(field: string): string {
    let message;
    switch (field) {
      case 'primerNombre':
        if (
          this.basicDataForm?.get(field).hasError('required') &&
          this.isTouchedField(this.basicDataForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'primerApellido':
        if (
          this.basicDataForm?.get(field).hasError('required') &&
          this.isTouchedField(this.basicDataForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'tipoDocumento':
        if (
          this.basicDataForm?.get(field).hasError('required') &&
          this.isTouchedField(this.basicDataForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'numeroIdentificacion':
        if (
          this.basicDataForm?.get(field).hasError('required') &&
          this.isTouchedField(this.basicDataForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'telefonoFijo':
        if (this.basicDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Permite hasta 10 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'telefonoCelular':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener al menos 10 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Permite hasta 10 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'email':
        if ( this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('email') &&
          this.isTouchedField(this.basicDataForm, field)) {
          message = 'No tiene el formato de un email';
        }
        break;
      case 'confirmarEmail':
        if ( this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('email') &&
          this.isTouchedField(this.basicDataForm, field)) {
          message = 'No tiene el formato de un email';
        }
        break;

    }
    return message;
  }



}

