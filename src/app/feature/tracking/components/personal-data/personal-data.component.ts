import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";

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
   * Lista de tipos de identificación
   */

  constructor(public fb: FormBuilder,
              public cityService: CityService, private controlContainer: ControlContainer)
  {
    super();

/*

this.basicDataForm=this.fb.group({

  tipoDocumento: [ '' , [ Validators.required ]],
  numeroIdentificacion: [ '' , [ Validators.required ]],
  primerNombre: [ '' , [ Validators.required ]],
  segundoNombre: [ '' ],
  primerApellido: [ '' , [ Validators.required ]],
  segundoApellido: [ '' ],
  email: [ '' , [ Validators.required, Validators.email ]],
  confirmarEmail: [ '' , [ Validators.required, Validators.email ]],
  telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]],
  telefonoCelular: [ '' , [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]], fechaNacimiento: [ '' , [ Validators.required, super.dateValidator ]],
  sexo: [ '' , [ Validators.required ]],
  genero: [ '' , [ Validators.required ]],
  orientacionSexual: [ '' , [ Validators.required ]],
  etnia: [ '' , [ Validators.required ]],
  estadoCivil: [ '' , [ Validators.required ]],
  nivelEducativo: [ '' , [ Validators.required ]],



})
   this.basicDataForm.get('telefonoFijo').setValue("hola?");
 */





  }
  ngOnInit(): void {
    this.basicDataForm = this.controlContainer.control;
    this.basicDataForm = this.basicDataForm.controls['basicDataForm'];

    this.cityService.getIdentificationType().subscribe(resp => {
      this.identificationType = resp.data
    });

    this.cityService.getSex().subscribe(resp=>this.sexes = resp.data);
    this.cityService.getGender().subscribe(resp=>this.gender = resp.data);
    this.cityService.getSexualOrientation().subscribe(resp=>this.sexualOrientation = resp.data);
    this.cityService.getEthnicity().subscribe(resp=>this.ethnicity = resp.data);
    this.cityService.getEducationLevel().subscribe(resp=>this.educationLevel = resp.data);





  }


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
