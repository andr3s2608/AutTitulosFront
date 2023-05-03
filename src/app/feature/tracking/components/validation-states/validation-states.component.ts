import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";
import {StatusService} from "../../../../core/services/status.service";
import {TrackingService} from "../../../../core/services/tracking.service";


@Component({
  selector: 'app-validation-states',
  templateUrl: './validation-states.component.html',
  styleUrls: ['./validation-states.component.scss']
})
export class ValidationStatesComponent extends AppBaseComponent implements OnInit {

  @Input() tramitNumber: string;

  @Input() idnumber: string;

  @Input() apliccantname: string;

  @Input() actualstatus: string;

  /**
   * estado seleccionado a mostrar
   */
  public showduplicated: boolean=false;

  /**
   * estado seleccionado a mostrar
   */
  public status: any;

  /**
   * Formulario hijo con los estados de la validacion
   */
  public validationStateForm: any;

  /**
   * lista de los estados de validacion
   */
  public solicitudstates: any[] = [];

  /**
   * lista de los tramites con el mismo n° de identificacion
   */
  public duplicatedid: any[] = [];

  constructor(public fb: FormBuilder,
              public statusService: StatusService,public trackingService: TrackingService, private controlContainer: ControlContainer) {
    super();

  }

  ngOnInit(): void {
    this.validationStateForm = this.controlContainer.control;
    this.validationStateForm = this.validationStateForm.controls['validationstateform'];

    this.statusService.getStatusTypes("Subdirector").subscribe(resp => {

      this.solicitudstates = resp.data;
      let statustosearch='';
      if(this.actualstatus==='14')
      {
        statustosearch='3';
      }
      if(this.actualstatus==='15')
      {
        statustosearch='9';
      }
      if(statustosearch!='')
      {
        for (const element of this.solicitudstates) {

          if (element.idStatusType + "" == statustosearch) {
            this.validationStateForm.get('selectedstatus').setValue(element.idStatusType);
            this.validationStateForm.get('status').setValue(element.description);
            this.status = element.description;
            break;
          }
        }
      }
      else {
        this.validationStateForm.get('selectedstatus').setValue(this.solicitudstates[0].idStatusType);
        this.validationStateForm.get('status').setValue(this.solicitudstates[0].description);
        this.status=this.solicitudstates[0].description;
      }


    });

    this.trackingService.getDuplicatedbyid(this.idnumber).subscribe(resp => {

      this.duplicatedid = resp.data;
      if(resp.count>1)
      {
        this.showduplicated=true;
      }
    });
  }

  public statechange(): void {
    for (const element of this.solicitudstates) {
      if ((element.idStatusType + "") === this.validationStateForm.get('selectedstatus').value) {
        this.status = element.description;
        this.validationStateForm.get('status').setValue(element.description);
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
