import {Component} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";
import {RegisterService} from "../../../../core/services/register.service";
import {PopUpService} from "../../../../core/services";

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

  constructor(public fb: FormBuilder, private router: Router,private registerService: RegisterService,private popupAlert: PopUpService) {
    super();

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en la Registro de Cámara de Comercio, estos\n" +
      "        datos serán usados para la generación de los Documentos asociados al trámite solicitado y su\n" +
      "        posterior reporte a entidades de vigilancia y control.";

    this.legalForm = this.fb.group({
      tipoIdentificacion: [ '' , [ Validators.required ]],
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

      this.popupAlert.errorAlert(
        'Debe llenar todos los campos',
        4000);


    }
    else {

      const data = {
        primerNombre: this.legalForm.get('basicDataForm.primerNombre').value.toString().toUpperCase(),
        segundoNombre: this.legalForm.get('basicDataForm.segundoNombre').value.toString().toUpperCase() ??  '',
        primerApellido: this.legalForm.get('basicDataForm.primerApellido').value.toString().toUpperCase(),
        segundoApellido: this.legalForm.get('basicDataForm.segundoApellido').value.toString().toUpperCase() ?? '',
        tipoDocumento: this.legalForm.get('basicDataForm.tipoDocumento').value, //listado tipos de documentos
        numeroIdentificacion: this.legalForm.get('basicDataForm.numeroIdentificacion').value,
        telefonoFijo: this.legalForm.get('basicDataForm.telefonoFijo').value ?? '',
        telefonoCelular: this.legalForm.get('basicDataForm.telefonoCelular').value,
        email: this.legalForm.get('basicDataForm.email').value.toString().toLowerCase(),
        tipoDocumentoRepresentanteLegal:this.legalForm.get('tipoIdentificacion').value,
        numeroDocumentoRepresentanteLegal:this.legalForm.get('nit').value,
        nombreRazonSocial:this.legalForm.get('razonsocial').value,
      };
      this.registerService.saveLegalPerson(data).subscribe(resp => {

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
            `Solicitad Validada Exitosamente`,
            4000
          );
          this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.CITIZEN)
        }


      });

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
