import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {CityService} from "../../../../core/services";


@Component({
  selector: 'app-legal-representant',
  templateUrl: './legal-representant.component.html',
  styleUrls: ['./legal-representant.component.scss']
})
export class LegalRepresentantComponent extends AppBaseComponent implements OnInit{

  /**
   * Formulario reactivo de los Datos basicos
   */
  public naturalForm: FormGroup;
  /**
   * Lista de tipos de identificación
   */
  public identificationType: any[];


  constructor(public fb: FormBuilder,
              public cityService: CityService)
  {
    super();
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
      telefonoCelular: [ '' , [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]]

    })
  }



  ngOnInit(): void {
    this.cityService.getIdentificationType().subscribe(resp => {
      this.identificationType = resp.data
    });
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

    }
    return message;
  }



  }

