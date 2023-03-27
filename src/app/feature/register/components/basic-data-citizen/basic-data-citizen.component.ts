import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService} from "../../../../core/services";
import {RegisterService} from "../../../../core/services/register.service";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";


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
              private registerService: RegisterService)
  {
    super();
  }

  ngOnInit(): void {
    this.basicDataForm = this.controlContainer.control;
    this.basicDataForm = this.basicDataForm.controls['basicDataForm'];
    this.registerService.getIdentificationType().subscribe(resp => {

      let filtro=resp.data.filter((i: { idTipoIdentificacion: string }) =>{ return(
        i.idTipoIdentificacion != "4" &&
        i.idTipoIdentificacion != "5" &&
        i.idTipoIdentificacion != "6")} );
      console.log(resp.data);
      filtro.push({codigo:"PPT",descripcion:"Permiso Protección Temporal",idTipoIdentificacion:4})
      this.identificationType = filtro;
      }
    );
  }

  /**
   * validacion de caracteres permitidos por tipo de documento
   */
public validationtype()
  {
    console.log(this.basicDataForm.get('tipoDocumento').value)
    if(this.basicDataForm.get('tipoDocumento').value==1)
    {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [ Validators.required ,Validators.minLength(4), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]);
      this.charactertype='Numerico';
      this.minlengtype='4';
      this.maxlengtype='10';
    }
    if(this.basicDataForm.get('tipoDocumento').value==2)
    {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [ Validators.required ,Validators.minLength(4), Validators.maxLength(16),Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype='Alfanumerico';
      this.minlengtype='4';
      this.maxlengtype='16';
    }
    if(this.basicDataForm.get('tipoDocumento').value==3)
    {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [ Validators.required ,Validators.minLength(10), Validators.maxLength(11),Validators.pattern("^[0-9]*$")]);
      this.charactertype='Numerico';
      this.minlengtype='10';
      this.maxlengtype='11';
    }
    if(this.basicDataForm.get('tipoDocumento').value==4)
    {
      this.basicDataForm.controls["numeroIdentificacion"].setValidators(
        [ Validators.required ,Validators.minLength(4), Validators.maxLength(18),Validators.pattern("^[0-9a-zA-Z]+$")]);
      this.charactertype='Alfanumerico';
      this.minlengtype='4';
      this.maxlengtype='18';
    }
    this.basicDataForm.get('numeroIdentificacion').setValue('');

    //

  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['primerNombre', 'primerApellido', 'tipoDocumento', 'numeroIdentificacion', 'telefonoCelular', 'email', 'confirmarEmail'];
    const onlyLetters: Array<string> = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
    const onlyNumbers: Array<string> = ['telefonoFijo', 'telefonoCelular'];
    const formatEmail: Array<string> = ['email', 'confirmarEmail'];

    if (this.isTouchedField(this.basicDataForm, field)) {
      if (required.includes(field) && this.basicDataForm?.get(field).hasError('required') ) {
        message = ErrorMessage.IS_REQUIRED;
      }
      else if (onlyLetters.includes(field) && this.basicDataForm?.get(field).hasError('pattern') ) {
        message = ErrorMessage.ONLY_LETTERS;
      }
      else if (onlyNumbers.includes(field) && this.basicDataForm?.get(field).hasError('pattern') ) {
        message = ErrorMessage.ONLY_NUMBERS;
      }
      else if (formatEmail.includes(field) && this.basicDataForm?.get(field).hasError('email')) {
        message = ErrorMessage.FORMAT_EMAIL;
      }
      else if (field == 'numeroIdentificacion') {
        if (this.basicDataForm?.get(field).hasError('pattern')) {
          message = `Solo se admiten caracteres del tipo `+ this.charactertype;
        } else if (this.basicDataForm?.get(field).hasError('minlength')) {
          message = `Debe tener una longitud mínima de `+ this.minlengtype;
        } else if (this.basicDataForm?.get(field).hasError('maxlength')) {
          message = `Debe tener una longitud máxima de `+ this.maxlengtype;
        }
      }
      else if (field == 'telefonoFijo' || 'telefonoCelular'){
        if (this.basicDataForm?.get(field).hasError('minlength')) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength')) {
          message = `Permite hasta 12 caracteres`;
        }
      }
      else if ((field == 'email' || field == 'confirmarEmail') && this.basicDataForm?.get(field).hasError('maxlength')) {
        message = `Permite hasta 50 caracteres`;
      }
    }

    return message;
  }



}

