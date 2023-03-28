import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";


@Component({
  selector: 'app-validation-states',
  templateUrl: './validation-states.component.html',
  styleUrls: ['./validation-states.component.scss']
})
export class ValidationStatesComponent extends AppBaseComponent implements OnInit {

  public tramitNumber: any = 1520;
  public status: any;

  /**
   * Formulario hijo con los estados de la validacion
   */
  public validationStateForm: any;


  public solicitudstates: any[] = [];

  constructor(public fb: FormBuilder,
              public cityService: CityService, private controlContainer: ControlContainer) {
    super();

    this.solicitudstates.push({idestado: 0, nombre: "Aprobado por parte del validador de documentos"})
    this.solicitudstates.push({idestado: 1, nombre: "Negado por parte del validador de documentos"})
    this.solicitudstates.push({idestado: 2, nombre: "Resuelve recurso de reposición de validación"})
    this.solicitudstates.push({idestado: 3, nombre: "Solicitar Información"})
    this.solicitudstates.push({idestado: 4, nombre: "Tramite-duplicado Anular"})
    this.solicitudstates.push({idestado: 5, nombre: "Resuelve recurso de aclaración validación"})
    this.solicitudstates.push({idestado: 6, nombre: "Firmar Documento"})
    this.solicitudstates.push({idestado: 7, nombre: "Devolver validación Coordinador"})
  }

  ngOnInit(): void {
    this.validationStateForm = this.controlContainer.control;
    this.validationStateForm = this.validationStateForm.controls['validationstateform'];
  }

  public statechange(): void {


    this.status = this.solicitudstates[this.validationStateForm.get('selectedstatus').value].nombre;


  }

  getErrorMessage(field: string): string {
    let message;

    if (this.validationStateForm?.get(field).hasError('required') && this.isTouchedField(this.validationStateForm, field)) {
      message = 'Es requerido';
    }

    return message;
  }


}
