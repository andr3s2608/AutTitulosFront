import {Component} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
      nit: [ '' , [ Validators.required ], Validators.pattern("^[0-9-]*$") ],
      razonsocial: [ '' , [ Validators.required ]],

      basicDataForm: this.fb.group(
        {
          tipoDocumento: [ '' , [ Validators.required ]],
          numeroIdentificacion: [ '' , [ Validators.required ]],
          primerNombre: [ '' , [ Validators.required ]],
          segundoNombre: [ '' ],
          primerApellido: [ '' , [ Validators.required ]],
          segundoApellido: [ '' ],
          email: [ '' , [ Validators.required, Validators.email ]],
          confirmarEmail: [ '' , [ Validators.required, Validators.email ]],
          telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]],
          telefonoCelular: [ '' , [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]]
        }
      ), checkBoxDatosPersonales: [ '' , [ Validators.required, Validators.requiredTrue]]



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
    switch (field) {
      case 'razonsocial':
        if (
          this.legalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.legalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'nit':
        if (
          this.legalForm?.get(field).hasError('required') &&
          this.isTouchedField(this.legalForm, field)
        ) {
          message = 'Es requerido';
        }
        break;
      case 'checkBoxDatosPersonales':
        if ( this.legalForm?.get(field).hasError('required') && this.isTouchedField(this.legalForm, field)) {
          message = 'Debe marcar la casilla';
        } else if (this.legalForm?.get(field).hasError('requiredTrue') && this.isTouchedField(this.legalForm, field)) {
          message = 'Debe marcar la casilla';
        }
        break;

    }
    return message;
  }


}
