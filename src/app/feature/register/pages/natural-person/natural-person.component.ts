import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService, PopUpService} from "../../../../core/services";
import {ROUTES} from "../../../../core/enums";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {RegisterService} from "../../../../core/services/register.service";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";

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

  /**
   * Array de Direccion completa
   */
  public Direcction =["","","","","","","","","","","",""];

  constructor(public fb: FormBuilder,
              public cityService: CityService,
              private router: Router,
              private registerService: RegisterService, private popupAlert: PopUpService) {

    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en su documento de identidad, estos\n" +
      "    datos seran usados para la generaciòn de los Documentos asociados al trámite solicitado y su\n" +
      "    posterior reporte a entidades de vigilancia y control.";

    this.sending = false;

    this.naturalForm = this.fb.group({
      basicDataForm: this.fb.group(
        {
          tipoDocumento: ['', [Validators.required]],
          numeroIdentificacion: ['', [Validators.required]],
          primerNombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
          segundoNombre: ['', [Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
          primerApellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
          segundoApellido: ['', [Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
          confirmarEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
          telefonoFijo: ['', [Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
          telefonoCelular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]]
        }
      ),
      geographicDataForm: this.fb.group(
        {
          nacionalidad: ['', [Validators.required]],
          ciudadnacimientootro: [''],
          departamentoResidencia: ['', [Validators.required]],
          ciudadResidencia: ['', [Validators.required]],
          departamentoNacimiento: ['', [Validators.required]],
          ciudadNacimiento: ['', [Validators.required]],
        }
      ),

      viaprincipal: ['', [Validators.required]],
      num1: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(3)]],
      Letra: [''],
      BIS: [''],
      Card: [''],
      Complemento: [''],
      num2: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(3)]],
      Letra2: [''],
      placa: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(2)]],
      Card2: [''],
      Adicional: [''],
      Detalle: [''],
      upz: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      direccionResidencia: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, super.dateValidator]],
      sexo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      orientacionSexual: ['', [Validators.required]],
      etnia: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      nivelEducativo: ['', [Validators.required]],
      checkBoxDatosPersonales: ['', [Validators.required, Validators.requiredTrue]]
    })

  }

  public ngOnInit(): void {
    this.cityService.getCountries().subscribe(paises => this.countries = paises.data);
    this.cityService.getDepartaments().subscribe(departamentos => this.departaments = departamentos.data)

    this.registerService.getSex().subscribe(resp => this.sexes = resp.data);
    this.registerService.getGender().subscribe(resp => this.gender = resp.data);
    this.registerService.getSexualOrientation().subscribe(resp => this.sexualOrientation = resp.data);
    this.registerService.getEthnicity().subscribe(resp => this.ethnicity = resp.data);
    //this.registerService.getMaritalStatus().subscribe(resp=>this.maritalStatus = resp.data);
    this.registerService.getEducationLevel().subscribe(resp => this.educationLevel = resp.data);
    this.cityService.getUpz().subscribe(resp => this.upzlist = resp.data);
    this.cityService.getBarrios().subscribe(resp => this.barriolist = resp.data);
    this.cityService.getLocalities().subscribe(resp => this.localitieslist = resp.data);
    this.cityService.getZones().subscribe(resp => this.zoneslist = resp.data);
  }

  public cancelar() {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.REGISTER);
  }

  public direccion(position:number,text:string) {
    console.log(position,text);
    this.Direcction[position]=text;
    let directionarmed="";
    for (const element of this.Direcction) {
      directionarmed = directionarmed + element+" ";
    }
    this.naturalForm.get('direccionResidencia').setValue(directionarmed);

  }

  public async guardar(): Promise<void> {
    if (!this.naturalForm.valid) {

        this.popupAlert.errorAlert(
          'Debe llenar todos los campos',
          4000);

      console.log("FORMULARIO PROCESADO");
      console.log(this.naturalForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.naturalForm));
      this.naturalForm.markAllAsTouched();



    }
    else {
      if (this.naturalForm.get('basicDataForm.email').value != this.naturalForm.get('basicDataForm.confirmarEmail').value) {
        console.log("el correo debe ser igual");

        this.popupAlert.errorAlert(
          `Por favor, revise el formulario de la solicitud, los emails ingresados no son iguales.`,
          4000
        );
        return;
      }
      else
      {





        const data = {
          primerNombre: this.naturalForm.get('basicDataForm.primerNombre').value.toString().toUpperCase(),
          segundoNombre: this.naturalForm.get('basicDataForm.segundoNombre').value.toString().toUpperCase() ??  '',
          primerApellido: this.naturalForm.get('basicDataForm.primerApellido').value.toString().toUpperCase(),
          segundoApellido: this.naturalForm.get('basicDataForm.segundoApellido').value.toString().toUpperCase() ?? '',
          tipoDocumento: this.naturalForm.get('basicDataForm.tipoDocumento').value, //listado tipos de documentos
          numeroIdentificacion: this.naturalForm.get('basicDataForm.numeroIdentificacion').value,
          telefonoFijo: this.naturalForm.get('basicDataForm.telefonoFijo').value ?? '',
          telefonoCelular: this.naturalForm.get('basicDataForm.telefonoCelular').value,
          email: this.naturalForm.get('basicDataForm.email').value.toString().toLowerCase(),
          nacionalidad: this.naturalForm.get('geographicDataForm.nacionalidad').value, //listado de paises
          Departamento: this.naturalForm.get('geographicDataForm.nacionalidad').value=== 170 ?
          this.naturalForm.get('geographicDataForm.departamentoNacimiento') :1, //listado de departamentos
          ciudadNacimientoOtro: this.naturalForm.get('geographicDataForm.nacionalidad').value!== 170 ?
            this.naturalForm.get('geographicDataForm.ciudadnacimientootro').value : '',
          CiudadNacimiento: this.naturalForm.get('geographicDataForm.nacionalidad').value=== 170 ?
            this.naturalForm.get('geographicDataForm.ciudadNacimiento').value  : 1, //listado municipios
          departamentoResidencia: this.naturalForm.get('geographicDataForm.departamentoResidencia').value, //listado departamentos
          ciudadResidencia: this.naturalForm.get('geographicDataForm.ciudadResidencia').value, //listado municipios
          direccionResidencia: this.naturalForm.get('direccionResidencia').value,
          fechaNacimiento: this.naturalForm.get('fechaNacimiento').value,
          sexo: this.naturalForm.get('sexo').value, //listado sexo
          genero: this.naturalForm.get('genero').value, //lista quemada
          orientacionSexual: this.naturalForm.get('orientacionSexual').value, //lista quemada
          etnia: this.naturalForm.get('etnia').value ?? '', //listado etnia
          estadoCivil: this.naturalForm.get('estadoCivil').value, //lista quemada
          nivelEducativo: this.naturalForm.get('nivelEducativo').value,//listado nivel educativo,
          cx:1,
          cy:1,
          upz:this.naturalForm.get('upz').value,
          zona:this.naturalForm.get('zona').value,
          Barrio:this.naturalForm.get('barrio').value,
          Localidad:this.naturalForm.get('localidad').value
        };



          this.registerService.saveNaturalPerson(data).subscribe(resp => {

            if(resp.data==0 ||resp.data==null )
            {
              this.popupAlert.errorAlert(
                resp.message,
                4000
              );
            }
            else
            {
              this.popupAlert.successAlert(
                `Usuario Registrado exitosamente`,
                4000
              );
              let nuevoHTML='';

              this.registerService.getFormats("1").subscribe(resp => {
                const llavesAReemplazar = ['~:~ciudadano~:~', '~:~tipo_de_solicitud~:~', '~:~numero_de_tramite~:~'];
                const valoresDinamicos = ['', '', ''];
                nuevoHTML=resp.result.data.body;

                for (let index = 0; index < llavesAReemplazar.length; index++) {
                  nuevoHTML = nuevoHTML.replace(llavesAReemplazar[index], valoresDinamicos[index]);
                }

                this.registerService.sendEmail({
                  to: this.naturalForm.get('basicDataForm.email').value.toString().toLowerCase(),
                  subject: 'Registro en la plataforma',
                  body: nuevoHTML
                }).subscribe(resp => {
                });


                this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.CITIZEN)
              });

            }


          });




      }
    }
  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['nacionalidad', 'departamentoResidencia', 'ciudadResidencia', 'direccionResidencia', 'num1', 'num2', 'placa', 'viaprincipal', 'zona', 'upz', 'barrio', 'localidad', 'fechaNacimiento', 'sexo', 'genero', 'orientacionSexual', 'etnia', 'estadoCivil', 'nivelEducativo', 'checkBoxDatosPersonales'];
    const onlyNumbers: Array<string> = ['num1', 'num2', 'placa'];
    const dateError: Array<string> = ['fechaNacimiento'];

    if (this.isTouchedField(this.naturalForm, field)) {
      if (required.includes(field) && this.naturalForm?.get(field).hasError('required')) {
          message = ErrorMessage.IS_REQUIRED;
      }
      else if (onlyNumbers.includes(field) && this.naturalForm?.get(field).hasError('pattern') ) {
        message = ErrorMessage.ONLY_NUMBERS;
      }
      else if (dateError.includes(field) && this.naturalForm?.get(field).hasError('invalidDate') ) {
        message = ErrorMessage.NO_FUTURE_DATE;
      }

      switch (field) {
        case 'placa':
          if (this.naturalForm?.get(field).hasError('minlength') ) {
            message = `Debe tener al menos 1 caracter`;
          } else if (this.naturalForm?.get(field).hasError('maxlength') ) {
            message = `Permite hasta 2 caracteres`;
          }
          break;
        case 'num1':
        case 'num2':
          if (this.naturalForm?.get(field).hasError('minlength') ) {
            message = `Debe tener al menos 1 caracter`;
          } else if (this.naturalForm?.get(field).hasError('maxlength') ) {
            message = `Permite hasta 3 caracteres`;
          }
          break;

      }
    }

    return message;
  }

}
