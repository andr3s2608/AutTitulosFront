import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService} from "../../../../core/services";
import {ROUTES} from "../../../../core/enums";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
  /**
   * Lista de Upz
   */
  public upzlist: any[];
  /**
   * Lista de Barrios
   */
  public barriolist: any[];
  /**
   * Lista de Localidades
   */
  public localitieslist: any[];
  /**
   * Lista de Zonas
   */
  public zoneslist: any[];

  constructor(public fb: FormBuilder,
              public cityService: CityService, private router: Router) {

    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en su documento de identidad, estos\n" +
      "    datos seran usados para la generaciòn de los Documentos asociados al trámite solicitado y su\n" +
      "    posterior reporte a entidades de vigilancia y control.";

    this.sending = false;

    this.naturalForm = this.fb.group({
      basicDataForm: this.fb.group(
        {
          tipoDocumento: [ '' , [ Validators.required ]],
          numeroIdentificacion: [ '' , [ Validators.required ]],
          primerNombre: [ '' , [ Validators.required ], Validators.maxLength(50),Validators.pattern("^[a-zA-Z \-\']{1,50}$")],
          segundoNombre: [ '' ],
          primerApellido: [ '' , [ Validators.required ], Validators.maxLength(50)],
          segundoApellido: [ '' ],
          email: [ '' , [ Validators.required, Validators.email ], Validators.maxLength(50)],
          confirmarEmail: [ '' , [ Validators.required, Validators.email ], Validators.maxLength(50)],
          telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]],
          telefonoCelular: [ '' , [ Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]]
        }
      ),
      geographicDataForm: this.fb.group(
        {
          nacionalidad: [ '' , [ Validators.required ]],
          departamentoNacimiento: [ '' , [ Validators.required ]],
          ciudadNacimiento: ['', [ Validators.required ]],
          departamentoResidencia: [ '' , [ Validators.required ]],
          ciudadResidencia: [ '' , [ Validators.required ]]
        }
      ),

      viaprincipal: [ '' , [ Validators.required ]],
      num1: [ '' , [ Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(1), Validators.maxLength(3) ] ],
      num2: [ '' , [ Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(1), Validators.maxLength(3) ] ],
      placa: [ '' , [ Validators.required ],Validators.pattern("^[0-9]*$"),Validators.minLength(1), Validators.maxLength(2) ],
      upz: [ '' , [ Validators.required ]],
      localidad: [ '' , [ Validators.required ]],
      barrio: [ '' , [ Validators.required ]],
      zona: [ '' , [ Validators.required ]],
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




    this.cityService.getSex().subscribe(resp=>this.sexes = resp.data);
    this.cityService.getGender().subscribe(resp=>this.gender = resp.data);
    this.cityService.getSexualOrientation().subscribe(resp=>this.sexualOrientation = resp.data);
    this.cityService.getEthnicity().subscribe(resp=>this.ethnicity = resp.data);
    //this.cityService.getMaritalStatus().subscribe(resp=>this.maritalStatus = resp.data);
    this.cityService.getEducationLevel().subscribe(resp=>this.educationLevel = resp.data);

    this.cityService.getUpz().subscribe(resp=>this.upzlist = resp.data);
    this.cityService.getBarrios().subscribe(resp=>this.barriolist = resp.data);
    this.cityService.getLocalities().subscribe(resp=>this.localitieslist = resp.data);
    this.cityService.getZones().subscribe(resp=>this.zoneslist = resp.data);

    this.cityService.getIdentificationType().subscribe(resp => {
      this.identificationType = resp.data

    });
    /*
    if(this.naturalForm.get('departamentoResidencia').value != null && this.naturalForm.get('departamentoResidencia').value !="") {
      this.cityService.getMunByDepaId(this.naturalForm.get('departamentoResidencia').value).subscribe(resp => {
        this.municipalities = resp.data
      });
    }
    */

  }

  public cancelar()
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.REGISTER);
  }

   public  async guardar(): Promise<void>
  {
    if(!this.naturalForm.valid)
    {
      if(this.naturalForm.get('basicDataForm.email').value != this.naturalForm.get('basicDataForm.confirmarEmail').value) {
        console.log("el correo debe ser igual");
        /*
        this.popupAlert.errorAlert(
          `Por favor, revise el formulario de la solicitud, los emails ingresados no son iguales.`,
          4000
        );
        */

        return;
      }
      console.log("FORMULARIO PROCESADO");
      console.log(this.naturalForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.naturalForm));
      this.naturalForm.markAllAsTouched();


      Swal.fire({
        icon: 'error',
        title: 'Datos Incompletos',
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'OK',
        text: 'Será redigirido a la página principal y deberá iniciar sesión nuevamente para acceder a los servicios.',
      })
    }
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
      case 'num1':

        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('minlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Debe tener al menos 1 caracter`;
        } else if (this.naturalForm?.get(field).hasError('maxlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Permite hasta 3 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('pattern') && this.isTouchedField(this.naturalForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'num2':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('minlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Debe tener al menos 1 caracter`;
        } else if (this.naturalForm?.get(field).hasError('maxlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Permite hasta 3 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('pattern') && this.isTouchedField(this.naturalForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'placa':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        } else if (this.naturalForm?.get(field).hasError('minlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Debe tener al menos 1 caracter`;
        } else if (this.naturalForm?.get(field).hasError('maxlength') && this.isTouchedField(this.naturalForm, field)) {
          message = `Permite hasta 2 caracteres`;
        } else if (this.naturalForm?.get(field).hasError('pattern') && this.isTouchedField(this.naturalForm, field)) {
          message = `Solo se admiten numeros`;
        }
        break;
      case 'viaprincipal':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'zona':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'upz':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'barrio':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'localidad':
        if (this.naturalForm?.get(field).hasError('required') && this.isTouchedField(this.naturalForm, field)) {
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
