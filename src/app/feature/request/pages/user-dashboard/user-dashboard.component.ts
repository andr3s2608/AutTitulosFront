import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProcedureResponseTableUserDto} from "../../../../core/models/procedureResponseTableUserDto";
import {RequestService} from "../../../../core/services/request.service";
import {TrackingService} from "../../../../core/services/tracking.service";
import {PopUpService} from "../../../../core/services";
import Swal from "sweetalert2";
import {AppBaseComponent} from "../../../../core/utils";
import {DocumentSupportDto} from "../../../../core/models/documentSupportDto.model";
import {lastValueFrom} from "rxjs";
import {DocumentsService} from "../../../../core/services/documents.service";
import {TrackingRequestDto} from "../../../../core/models/trackingRequestDto";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent extends AppBaseComponent implements OnInit {

  /**
   * Centinela que habilita la tabla con las solicitudes
   */
  public showDashboard: boolean;

  /**
   * Centinela que habilita el formulario de aclaración
   */
  public showDisclaimerForm: boolean;

  /**
   * Lista de solicitudes realizadas por el ciudadano
   */
  public allByUser: ProcedureResponseTableUserDto[];

  /**
   * Filtado de lista de las solicitudes
   */
  public filterAllByUser: ProcedureResponseTableUserDto[];

  /**
   * Lista de seguimiento de una solicitud
   */
  public trackingRequest: any[] = [];

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * Formulario padre de la solicitud de aclaracion
   */
  public requestClarificationForm: FormGroup;

  /**
   * Centinela para dehabilitar el boton de guardar aclaracion
   */
  public sending: boolean;

  /**
   * Info de la solicitud
   */
  public infoRequest: any;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private trackingService: TrackingService,
              private popUp: PopUpService,
              private documentsService: DocumentsService) {
    super();
    this.stepAdvanceLine = 4;
    this.currentProgressAdvanceLine = 94;
    this.showDashboard = true;
    this.showDisclaimerForm = false;

    this.requestClarificationForm = this.fb.group({
      clarificationForm: this.fb.group({
        reasonTypeId: ["", Validators.required ],
        fileSupport: [],
        observation: ["", Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.popUp.infoAlert("Cargando solicitudes", 2000);

    this.requestService.getDashboardUser("idUserQuemado").subscribe({
      next: value => {
        this.allByUser = value;
        this.filterTable(0);
      }
    })
  }

  /**
   * Filtra la tabla para ocultar/mostrar solicitudes solucionadas
   * @param filter 0 para recientes,
   *               1 para solucionados
   */
  public filterTable(filter: number): void {
    if (filter == 0) {
      this.filterAllByUser = this.allByUser.filter(request => request.statusId != 11);
    } else {
      this.filterAllByUser = this.allByUser.filter(request => request.statusId == 11);
    }
  }


  /**
   * Carga la lista de seguimiento de una solicitud
   * @param idRequest
   */
  public loadTrackingProcedure(idRequest: number): void {
    console.log("enntre al tacking", idRequest)
    this.trackingService.getTrackingbyid(String(idRequest)).subscribe({
      next: value => {
        this.trackingRequest = value.data;
      }
    })
  }

  public showClarification(idProcedure: number, filed: string, titleType: string): void {

    this.infoRequest = {
      idProcedure,
      filed,
      titleType
    }

    this.showDisclaimerForm = true;
    this.showDashboard = false;

  }

  public async saveClarification(): Promise<void> {

    try {

      if (!this.requestClarificationForm.valid) {
        this.popUp.errorAlert(
          `Por favor, revise el formulario de la solicitud, hay datos inválidos y/o incompletos.`,
          4000
        );
        console.log("FORMULARIO PROCESADO");
        console.log(this.requestClarificationForm.value);
        console.log("ERRORES FORMULARIO");
        console.log(super.getAllErrors(this.requestClarificationForm));
        this.requestClarificationForm.markAllAsTouched();
        return;
      }

      const formData = this.requestClarificationForm.value;
      const clarificationForm = formData['clarificationForm'];

      console.log("formData",formData)

      if (clarificationForm.fileSupport == null) {
        this.popUp.errorAlert(
          'No ha cargado el soporte de recurso de reposición ó solicitar aclaración, ¡revise por favor!',
          4000);
        return;
      }

      this.sending = true;

      let documentsSave: DocumentSupportDto[] = [];

      console.log("documentos capturados", clarificationForm.fileSupport);

      //TODO completar funcionalidad  cuando haya blobstorage
      documentsSave.push({
        IdDocumentType: 6,
        IdProcedureRequest: this.infoRequest.idProcedure,
        path: "pathQuemado",
        is_valid: true,
        registration_date: new Date(Date.now()),
        modification_date: new Date(Date.now())
      })

      console.log("documentos a enviar", documentsSave);
      await lastValueFrom(this.documentsService.addDocumentsToRequest(documentsSave));
      console.log("se guardaron documentos");


      //guardar tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: clarificationForm.reasonTypeId,
        IdProcedureRequest:  this.infoRequest.idProcedure,
        IdUser: "idUserQuemado",
        dateTracking: new Date(Date.now()),
        observations: "Solicitud de aclaración por ciudadano"
      }

      console.log("tracking a enviar", tracking);

      await lastValueFrom(this.trackingService.addTracking(tracking));


      this.popUp.successAlert("Solicitud realizada exitosamente. Puede abandonar la página.", 4000);


    } catch (e) {
      console.log(e)
      this.popUp.errorAlert("A ocurrido un error al guardar la aclaración.", 4000);
    }
  }

}
