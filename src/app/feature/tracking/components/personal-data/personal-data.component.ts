import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService, PopUpService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";
import {RegisterService} from "../../../../core/services/register.service";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent extends AppBaseComponent implements OnInit{

  public basicDataForm:any;
  public valorx: any="hola";

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
              private registerService: RegisterService,private popupAlert: PopUpService)
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
      filtro.push({codigo:"PPT",descripcion:"Permiso Protección Temporal",idTipoIdentificacion:4})
      this.identificationType = filtro;
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
    this.basicDataForm.get('numeroIdentificacion').setValue( this.basicDataForm.get('numeroIdentificacion').value)
    this.basicDataForm.get('numeroIdentificacion').markAsTouched();
    if(!this.basicDataForm.get('numeroIdentificacion').valid)
    {
      this.popupAlert.errorAlert(
        'por favor verifique el numero de documento',
        4000);
    }
    //this.basicDataForm.get('numeroIdentificacion').setValue('');

    //

  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
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
        else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {

          message = `Solo se admiten Letras`;
        }

        break;
      case 'segundoNombre':
        if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten Letras`;
        }
        break;
      case 'primerApellido':
        if (
          this.basicDataForm?.get(field).hasError('required') &&
          this.isTouchedField(this.basicDataForm, field)
        ) {
          message = 'Es requerido';
        }
        else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten Letras`;
        }
        break;
      case 'segundoApellido':
        if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten Letras`;
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
        else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten caracteres del tipo `+this.charactertype;
        }
        else if (this.basicDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener una longitud minima de `+this.minlengtype;
        }
        else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener una longitud maxima de `+this.maxlengtype;
        }
        break;
      case 'telefonoFijo':
        if (this.basicDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Permite hasta 12 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('pattern') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'telefonoCelular':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('minlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Permite hasta 12 caracteres`;
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
        }else if (this.basicDataForm?.get(field).hasError('maxlength') && this.isTouchedField(this.basicDataForm, field)) {
          message = `Permite hasta 50 caracteres`;
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
      case 'fechaNacimiento':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'sexo':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'genero':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'orientacionSexual':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'etnia':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'estadoCivil':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'nivelEducativo':
        if (this.basicDataForm?.get(field).hasError('required') && this.isTouchedField(this.basicDataForm, field)) {
          message = 'Es requerido';
        } else if (this.basicDataForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.basicDataForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;

    }
    return message;
  }



}
