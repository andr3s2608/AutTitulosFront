import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService} from "../../../../core/services";

/**
 * Componente encargado del formulario de registro de persona natural
 */
@Component({
  selector: 'app-natural-person',
  templateUrl: './natural-person.component.html',
  styleUrls: ['./natural-person.component.scss']
})
export class NaturalPersonComponent extends AppBaseComponent implements OnInit {

  /**
   * Cadena con mensaje inicial del formulario
   */
  public cadenaInicioRegistro: string;

  /**
   * Formulario reactivo del registro de persona natural
   */
  public naturalForm: FormGroup;

  /**
   * Centinela que indica si el formulario se está guardando
   */
  public sending: boolean;

  /**
   * Lista de paises
   */
  public countries: any[];

  /**
   * Lista de departamentos
   */
  public departaments: any[];

  /**
   * Lista de municipios
   */
  public municipalities: any[];

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
  public identificationType: any[];

  constructor(public fb: FormBuilder,
              public cityService: CityService) {

    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en su documento de identidad, estos\n" +
      "    datos seran usados para la generaciòn de los Documentos asociados al trámite solicitado y su\n" +
      "    posterior reporte a entidades de vigilancia y control.";

    this.sending = false;

    this.naturalForm = this.fb.group({
      tipoDocumento: [ '' , [ Validators.required ]],
      numeroIdentificacion: [ '' , [ Validators.required ]],
      primerNombre: [ '' , [ Validators.required ]],
      segundoNombre: [ '' ],
      primerApellido: [ '' , [ Validators.required ]],
      segundoApellido: [ '' ],
      email: [ '' , [ Validators.required, Validators.email ]],
      confirmarEmail: [ '' , [ Validators.required, Validators.email ]],
      telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]],
      telefonoCelular: [ '' , [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]],
      nacionalidad: [ '' , [ Validators.required ]],
      departamento: ['', [ Validators.required ]],
      departamentoNacimiento: [ '' , [ Validators.required ]],
      ciudadNacimiento: ['', [ Validators.required ]],
      ciudadNacimientoOtro: [''],
      departamentoResidencia: [ '' , [ Validators.required ]],
      ciudadResidencia: [ '' , [ Validators.required ]],
      direccionResidencia: [ '' , [ Validators.required ]],
      fechaNacimiento: [ '' , [ Validators.required, super.dateValidator ]],
      sexo: [ '' , [ Validators.required ]],
      genero: [ '' , [ Validators.required ]],
      orientacionSexual: [ '' , [ Validators.required ]],
      etnia: [ '' , [ Validators.required ]],
      estadoCivil: [ '' , [ Validators.required ]],
      nivelEducativo: [ '' , [ Validators.required ]],
      checkBoxDatosPersonales: [ '' , [ Validators.required, Validators.requiredTrue]]
    })

  }

  public ngOnInit(): void {
    this.cityService.getCountries().subscribe(paises => this.countries = paises.data);
    this.cityService.getDepartaments().subscribe(
      departamentos => this.departaments = departamentos.data)
    console.log(this.naturalForm.get('departamentoResidencia').value+"  acaaaa ")



    this.cityService.getSex().subscribe(resp=>this.sexes = resp.data);
    this.cityService.getGender().subscribe(resp=>this.gender = resp.data);
    this.cityService.getSexualOrientation().subscribe(resp=>this.sexualOrientation = resp.data);
    this.cityService.getEthnicity().subscribe(resp=>this.ethnicity = resp.data);
    //this.cityService.getMaritalStatus().subscribe(resp=>this.maritalStatus = resp.data);
    this.cityService.getEducationLevel().subscribe(resp=>this.educationLevel = resp.data);
    this.cityService.getIdentificationType().subscribe(resp => {
      this.identificationType = resp.data

    });
    if(this.naturalForm.get('departamentoResidencia').value != null && this.naturalForm.get('departamentoResidencia').value !="") {
      this.cityService.getMunByDepaId(this.naturalForm.get('departamentoResidencia').value).subscribe(resp => {
        this.municipalities = resp.data
      });
    }
  }

  public verificarFecha(): void {
    //Bloquea del calendario desplegable
    const datepicker = document.getElementById('fecha-de-nacimiento');
    const today = new Date();
    let date = today.getDate() > 9 ? today.getDate() :
      `0${today.getDate()}`;
    let month = today.getMonth() > 9 ? today.getMonth() + 1 :
      `0${today.getMonth() + 1}`;
    let year = today.getFullYear();

    datepicker.setAttribute('max', `${year}-${month}-${date}`);

  }

  getErrorMessage(field: string): string {
    let message;
    switch (field) {
      case 'primerNombre':
        if (
          this.naturalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.naturalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'primerApellido':
        if (
          this.naturalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.naturalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'tipoDocumento':
        if (
          this.naturalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.naturalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'numeroIdentificacion':
        if (
          this.naturalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.naturalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'telefonoFijo':
        if (this.naturalForm?.get(field).hasError('minlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Debe tener al menos 7 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('maxlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Permite hasta 10 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('pattern') && this.isTouchedField(this.naturalForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'telefonoCelular':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('minlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Debe tener al menos 10 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('maxlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Permite hasta 10 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('pattern') && this.isTouchedField(this.naturalForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'email':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('email') &&
          this.isTouchedField(this.naturalForm, field)) {
          message = 'No tiene el formato de un email';
        }
        break;
      case 'confirmarEmail':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('email') &&
          this.isTouchedField(this.naturalForm, field)) {
          message = 'No tiene el formato de un email';
        }
        break;
      case 'nacionalidad':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'departamentoResidencia':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'ciudadResidencia':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'direccionResidencia':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'fechaNacimiento':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'sexo':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'genero':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'orientacionSexual':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'etnia':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'estadoCivil':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'nivelEducativo':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('invalidDate') && this.isTouchedField(this.naturalForm, field)) {
          message = "La fecha no puede ser una fecha futura o superior a la de hoy";
        }
        break;
      case 'checkBoxDatosPersonales':
        if ( this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Debe marcar la casilla';
        } else if (this.naturalForm?.get(field).hasError('requiredTrue') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Debe marcar la casilla';
        }
        break;
    }
    return message;
  }

}
