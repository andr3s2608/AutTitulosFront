import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";
import {RegisterService} from "../../../../core/services/register.service";
import {StatusService} from "../../../../core/services/status.service";


@Component({
  selector: 'app-validation-states',
  templateUrl: './validation-states.component.html',
  styleUrls: ['./validation-states.component.scss']
})
export class ValidationStatesComponent extends AppBaseComponent implements OnInit {

  @Input() tramitNumber: string;

  @Input() idnumber: string;

  public status: any;

  /**
   * Formulario hijo con los estados de la validacion
   */
  public validationStateForm: any;


  public solicitudstates: any[] = [];

  constructor(public fb: FormBuilder,
              public statusService: StatusService, private controlContainer: ControlContainer) {
    super();
    this.statusService.getStatusTypes("Funcionario").subscribe(resp => {

      this.solicitudstates = resp.result.data;
      this.status=this.solicitudstates[0].description;
    });
  }

  ngOnInit(): void {
    this.validationStateForm = this.controlContainer.control;
    this.validationStateForm = this.validationStateForm.controls['validationstateform'];
  }

  public statechange(): void {
    for (let i = 0; i < this.solicitudstates.length; i++) {
      if((this.solicitudstates[i].idStatusType +"") === this.validationStateForm.get('selectedstatus').value)
      {
        this.status=this.solicitudstates[i].description;
        break;
      }
    }
  }

  getErrorMessage(field: string): string {
    let message;

    if (this.validationStateForm?.get(field).hasError('required') && this.isTouchedField(this.validationStateForm, field)) {
      message = 'Es requerido';
    }

    return message;
  }


}
