import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, Validators} from "@angular/forms";

import {CityService, PopUpService, RegisterService} from "@core-app/services";
import {AppBaseComponent} from "@core-app/utils";
import {ErrorMessage} from "@core-app/enums";

/**
 * Componente para los datos perosnales del ciudadano en la validación del funcionario
 */
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent extends AppBaseComponent implements OnInit {

  public campoDeshabilitado: boolean = true;
  public basicDataForm: any;
  public valorx: any = "hola";

  /**
   * Lista de tipos de identificación
   */
  public identificationType: any[];
  /**
   * Lista de sexos
   */
  public sexes: any[];

  /**
   * Lista de géneros
   */
  public gender: any[];

  /**
   * Lista de orientaciónes sexuales
   */
  public sexualOrientation: any[];

  /**
   * Lista de etnias
   */
  public ethnicity: any[];

  /**
   * Lista de estados civiles
   */
  public maritalStatus: any[];

  /**
   * Lista de niveles educativos
   */
  public educationLevel: any[];

  /**
   * Tipo de caracteres permitidos por tipo de documento
   */
  public charactertype: any;
  /**
   * Minimo de caracteres permitidos por tipo de documento
   */
  public minlengtype: any;
  /**
   * Maximo de caracteres permitidos por tipo de documento
   */
  public maxlengtype: any;


  constructor(public fb: FormBuilder,
              public cityService: CityService,
              private controlContainer: ControlContainer,
              private registerService: RegisterService, private popupAlert: PopUpService) {
    super();

  }


  ngOnInit(): void {
    this.basicDataForm = this.controlContainer.control;
    this.basicDataForm = this.basicDataForm.controls['basicDataForm'];

    this.registerService.getIdentificationType().subscribe(resp => {

      let filtro = resp.data.filter((i: { idTipoIdentificacion: string }) => {
        return (
          i.idTipoIdentificacion != "5"
         )
      });

      let valorinternoid = filtro.filter((i: { idTipoIdentificacion: string }) => {
        return (
          i.idTipoIdentificacion == (this.basicDataForm.get('tipoDocumento').value)+""
        )
      });

      this.identificationType = filtro;

      this.basicDataForm.get('documentodescripcion').setValue(valorinternoid[0].descripcion);
    });


    this.registerService.getSex().subscribe(resp => this.sexes = resp.data);
    this.registerService.getGender().subscribe(resp => this.gender = resp.data);
    this.registerService.getSexualOrientation().subscribe(resp => this.sexualOrientation = resp.data);
    this.registerService.getEthnicity().subscribe(resp => this.ethnicity = resp.data);
    this.registerService.getEducationLevel().subscribe(resp => this.educationLevel = resp.data);

  }

  /**
   * validacion de caracteres permitidos por tipo de documento
   */
  public validationtype() {

    let valorinternoid = this.identificationType.filter((i: { idTipoIdentificacion: string }) => {
      return (
        i.idTipoIdentificacion == (this.basicDataForm.get('tipoDocumento').value)+""
      )
    });


    this.basicDataForm.get('documentodescripcion').setValue(valorinternoid[0].descripcion);

    //Cedula de Ciudadania
    if (this.basicDataForm.get('tipoDocumento').value == 1) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
      this.charactertype = 'Numerico';
      this.minlengtype = '4';
      this.maxlengtype = '10';
    }
    //Cedula de Extranjeria
    if (this.basicDataForm.get('tipoDocumento').value == 2) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '4';
      this.maxlengtype = '16';
    }
    //Tarjeta de Identidad
    if (this.basicDataForm.get('tipoDocumento').value == 3) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]);
      this.charactertype = 'Numerico';
      this.minlengtype = '10';
      this.maxlengtype = '11';
    }
    //Pasaporte
    if (this.basicDataForm.get('tipoDocumento').value == 6) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '4';
      this.maxlengtype = '16';
    }
    //Numero Protocolo
    if (this.basicDataForm.get('tipoDocumento').value == 7) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9]*$")]);
      this.charactertype = 'Numerico';
      this.minlengtype = '2';
      this.maxlengtype = '10';
    }
    //Tarjeta de Extranjeria
    if (this.basicDataForm.get('tipoDocumento').value == 8) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '4';
      this.maxlengtype = '16';
    }
    //Registro Civil
    if (this.basicDataForm.get('tipoDocumento').value == 9) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '10';
      this.maxlengtype = '11';
    }
    //Numero Unico de identificacion
    if (this.basicDataForm.get('tipoDocumento').value == 10) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '10';
      this.maxlengtype = '11';
    }
    //Sin identificacion
    if (this.basicDataForm.get('tipoDocumento').value == 11) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '0';
      this.maxlengtype = '15';
    }
    //Otro documento
    if (this.basicDataForm.get('tipoDocumento').value == 12) {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [Validators.required, Validators.minLength(4), Validators.maxLength(18), Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype = 'Alfanumerico';
      this.minlengtype = '4';
      this.maxlengtype = '18';
    }

    this.basicDataForm.get('numeroIdentificacion').updateValueAndValidity();
    this.basicDataForm.get('numeroIdentificacion').setValue(this.basicDataForm.get('numeroIdentificacion').value)
    this.basicDataForm.get('numeroIdentificacion').markAsTouched();



  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const onlyLetters: Array<string> = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
    const onlyNumbers: Array<string> = ['telefonoFijo', 'telefonoCelular'];


    if (this.isTouchedField(this.basicDataForm, field)) {
      if (this.basicDataForm?.get(field).hasError('required')) {
        message = ErrorMessage.IS_REQUIRED;
      } else if (onlyLetters.includes(field)) {

        if (this.basicDataForm?.get(field).hasError('pattern')) {
          message = ErrorMessage.ONLY_LETTERS;
        } else if (this.basicDataForm?.get(field).hasError('maxlength')) {
          message = `Permite hasta 50 caracteres`;
        }


      } else if (onlyNumbers.includes(field)) {
        if (this.basicDataForm?.get(field).hasError('pattern')) {
          message = ErrorMessage.ONLY_NUMBERS;
        } else if (this.basicDataForm?.get(field).hasError('minlength')) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength')) {
          message = `Permite hasta 12 caracteres`;
        }

      } else if (this.basicDataForm?.get(field).hasError('email')) {
        message = ErrorMessage.FORMAT_EMAIL;
      } else if (this.basicDataForm?.get(field).hasError('invalidDate')) {
        message = ErrorMessage.NO_FUTURE_DATE;
      } else if (this.basicDataForm?.get(field).hasError('pattern')) {
        message = `Solo se admiten caracteres del tipo ` + this.charactertype;
      } else if (this.basicDataForm?.get(field).hasError('minlength')) {
        message = `Debe tener una longitud mínima de ` + this.minlengtype;
      } else if (this.basicDataForm?.get(field).hasError('maxlength')) {
        message = `Debe tener una longitud máxima de ` + this.maxlengtype;
      }

    }

    return message;
  }


}
