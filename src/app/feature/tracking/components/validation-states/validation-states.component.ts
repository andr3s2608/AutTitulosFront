import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder} from "@angular/forms";
import Swal from 'sweetalert2';
import {AppBaseComponent} from "@core-app/utils";
import {StatusService, TrackingService} from "@core-app/services";

/**
 * Componente para los diferentes estados de validación
 */
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


    this.statusService.getStatusTypes(localStorage.getItem('Role')).subscribe(resp => {

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
        Swal.fire({
          html: this.htmlduplicated()+"",   // Aquí se inserta el componente
          width: 1100,
          background: 'transparent',
          showCancelButton:false,
          showConfirmButton:false,
          showCloseButton:false,
        });
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


  public htmlduplicated():string
  {
    let solicitudes ='';
    for (let i = 0; i < this.duplicatedid.length; i++) {
      solicitudes=solicitudes+
        '<tr>'+
        '<td>'+this.duplicatedid[i].name_profesion +'</td>' +
        '<td>'+this.duplicatedid[i].name_institute +'</td>' +
        '<td>'+this.duplicatedid[i].date_resolution +'</td>'+
        '</tr>';
    }





    return '<div class="alert alert-danger" role="alert">\n' +
      '        El sistema ha identificado que el numero de identificación del trámite actual ya cuenta con profesiones\n' +
      '        registradas\n' +
      '        en nuestras bases de datos existentes en el sistema (Oracle y Agilinea).\n' +
      '        Agradecemos validar la siguiente información, si la profesión a realizar el trámite se encuentra a continuación.\n' +
      '        Favor abstenerse de continuar con la gestión.\n' +
      '\n' +
      '        <div class="row mt-3">\n' +
      '          <div class="col-xxl-6 col-md-6 col-lg-6 col-sm-6 col-xs-6">\n' +
      '            <p>Número de identificación:'+this.idnumber+'</p>\n' +
      '          </div>\n' +
      '          <div class="col-xxl-6 col-md-6 col-lg-6 col-sm-6 col-xs-6">\n' +
      '            <p>Nombre y Apellidos:'+this.apliccantname+'</p>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '\n' +
      '        <div>\n' +
      '          <div class="table ">\n' +
      '            <div class="table-responsive">\n' +
      '              <table class="table table-striped table-responsive" aria-describedby="tabla-tramite-duplicado">\n' +
      '                <thead>\n' +
      '                <tr>\n' +
      '                  <th [scope]="">Nombre profesión</th>\n' +
      '                  <th [scope]="">Nombre Institución</th>\n' +
      '                  <th [scope]="">Fecha y N° Resolución</th>\n' +
      '                </tr>\n' +
      '                </thead>\n' +
      '                <tbody>\n'
                       +solicitudes+
      '                </tbody>\n' +
      '              </table>\n' +
      '            </div>\n' +
      '          </div>\n' +
      '\n' +
      '        </div>\n' +
      '      </div>'
  }



}
