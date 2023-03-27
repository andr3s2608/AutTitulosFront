import {Component} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";

/**
 * Componente encargado del formulario de registro de persona juridica
 */
@Component({
  selector: 'app-legal-person',
  templateUrl: './legal-person.component.html',
  styleUrls: ['./legal-person.component.scss']
})
export class LegalPersonComponent  extends  AppBaseComponent{

  /**
   * Cadena con mensaje inicial del formulario
   */
  public cadenaInicioRegistro: string;

  public legalForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en la Registro de Cámara de Comercio, estos\n" +
      "        datos serán usados para la generación de los Documentos asociados al trámite solicitado y su\n" +
      "        posterior reporte a entidades de vigilancia y control.";

    this.legalForm = this.fb.group({
      tipoIdedentificacion: [ '' , [ Validators.required ]],
      nit: [ '' , [ Validators.required, Validators.pattern("^[0-9-]*$") ] ],
      razonsocial: [ '' , [ Validators.required ]],
      checkBoxDatosPersonales: [ '' , [ Validators.required, Validators.requiredTrue ]],

      basicDataForm: this.fb.group(
        {
          tipoDocumento: [ '' , [ Validators.required ]],
          numeroIdentificacion: [ '' , [ Validators.required ]],
          primerNombre: [ '' , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
          segundoNombre: [ '', [Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
          primerApellido: [ '' , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
          segundoApellido: [ '',[Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")] ],
          email: [ '' , [ Validators.required, Validators.email, Validators.maxLength(50) ]],
          confirmarEmail: [ '' , [ Validators.required, Validators.email, Validators.maxLength(50) ]],
          telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]],
          telefonoCelular: [ '' , [ Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]]
        }
      )
    })

  }


  public cancelar()
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.REGISTER);
  }

  public  async guardar(): Promise<void>
  {
    if(!this.legalForm.valid)
    {
      console.log("FORMULARIO PROCESADO");
      console.log(this.legalForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.legalForm));
      this.legalForm.markAllAsTouched();


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
    const required: Array<string> = ['razonsocial', 'nit', 'checkBoxDatosPersonales'];
    const formatCorrect: Array<string> = ['nit'];

    if (this.isTouchedField(this.legalForm, field)) {
      if (required.includes(field) && this.legalForm?.get(field).hasError('required') ) {
        message = ErrorMessage.IS_REQUIRED;
      }
      else if (formatCorrect.includes(field) && this.legalForm?.get(field).hasError('pattern') ) {
        message = 'Formato Incorrecto';
      }
    }
    return message;
  }


}
