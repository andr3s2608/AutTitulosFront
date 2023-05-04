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
import {ProcedureRequestBackDto} from "../../../../core/models/procedureRequestBack.model";
import {formatDate} from "@angular/common";

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
   * Centinela que habilita el formulario de editar tramite
   */
  public showEditProcedureForm: boolean;

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
   * Formulario padre del editar la solicitud
   */
  public editRequestForm: FormGroup;

  /**
   * Centinela para dehabilitar el boton de guardar aclaracion
   */
  public sending: boolean;

  /**
   * Info de la solicitud
   */
  public infoRequest: any;

  public editRequest: any;

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
    this.showEditProcedureForm = false;

    this.requestClarificationForm = this.fb.group({
      clarificationForm: this.fb.group({
        reasonTypeId: ["", Validators.required ],
        fileSupport: [],
        observation: ["", Validators.required]
      })
    });

    this.editRequestForm = this.fb.group({
      editObservationsForm: this.fb.group({
        idProcedure: [ '', [ Validators.required ] ],
        observations: [ '', [ Validators.required ] ],
      }),
      requestDataForm: this.fb.group({
        idProcedure: [ '', [ Validators.required ] ],
        titleTypeId: [ '', [ Validators.required ] ],
        instituteId: [ '', [ Validators.required ] ],
        professionId: [ '', [ Validators.required ] ],
        diplomaNumber: [ '', [ Validators.pattern("^[0-9]*$") ] ],
        graduationCertificate: [ '', [ ] ],
        endDate: [ '', [ Validators.required, super.dateValidator ] ],
        book: [ '', [ ] ],
        folio: [ '', [ ] ],
        yearTitle: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$"),  super.numberDateFuture ] ],
        professionalCard: [],
        nameInternationalUniversity: [],
        countryId: [],
        numberResolutionConvalidation: [],
        dateResolutionConvalidation: [],
        entityId: []
      }),
      attachmentForm: this.fb.group({
        quantityDocuments: [],
        documentSupports: [[]]
      })
    });
  }

  /**
   * Carga el listado de solicitudes de un ciudadano
   */
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
  public async loadTrackingProcedure(idRequest: number): Promise<void> {
    await lastValueFrom(this.trackingService.getTrackingbyid(String(idRequest))).then( value => {
        this.trackingRequest = value.data;
      }
    )
  }

  /**
   * Habilita el formulario de aclaración
   * @param idProcedure
   * @param filed
   * @param titleType
   */
  public showClarification(idProcedure: number, filed: string, titleType: string): void {

    this.infoRequest = {
      idProcedure,
      filed,
      titleType
    }

    this.showDisclaimerForm = true;
    this.showDashboard = false;
  }

  /**
   * Habilita el formulario de editar tramite
   */
  public async showEditProcedure(idProcedure: number): Promise<void> {
    this.popUp.infoAlert("Cargando trámite...", 4000);

    await lastValueFrom(this.requestService.getRequestbyid(String(idProcedure))).then(value => {this.editRequest = value})
    await this.loadTrackingProcedure(idProcedure);
    this.editRequestForm.get("editObservationsForm").get("idProcedure").setValue(this.editRequest.filed_number);
    this.editRequestForm.get("editObservationsForm").get("observations").setValue(this.trackingRequest[this.trackingRequest.length-1].additional_information);
    this.editRequestForm.get("editObservationsForm").disable();

    this.editRequestForm.get("requestDataForm").get("idProcedure").setValue(this.editRequest.filed_number);
    this.editRequestForm.get("requestDataForm").get("titleTypeId").setValue(this.editRequest.idTitleTypes);
    this.editRequestForm.get("requestDataForm").get("instituteId").setValue([this.editRequest.idInstitute, this.editRequest.name_institute]);
    this.editRequestForm.get("requestDataForm").get("professionId").setValue([this.editRequest.idProfessionInstitute, this.editRequest.name_profession]);
    this.editRequestForm.get("requestDataForm").get("diplomaNumber").setValue(this.editRequest.diploma_number);
    this.editRequestForm.get("requestDataForm").get("graduationCertificate").setValue(this.editRequest.graduation_certificate);
    this.editRequestForm.get("requestDataForm").get("endDate").setValue( formatDate(new Date(this.editRequest.end_date), 'yyyy-MM-dd', 'en'));
    this.editRequestForm.get("requestDataForm").get("book").setValue(this.editRequest.book);
    this.editRequestForm.get("requestDataForm").get("folio").setValue(this.editRequest.folio);
    this.editRequestForm.get("requestDataForm").get("yearTitle").setValue(this.editRequest.year_title);
    this.editRequestForm.get("requestDataForm").get("professionalCard").setValue(this.editRequest.professional_card);
    this.editRequestForm.get("requestDataForm").get("nameInternationalUniversity").setValue(this.editRequest.name_institute);
    this.editRequestForm.get("requestDataForm").get("countryId").setValue(this.editRequest.idCountry);
    this.editRequestForm.get("requestDataForm").get("numberResolutionConvalidation").setValue(this.editRequest.number_resolution_convalidation);
    this.editRequestForm.get("requestDataForm").get("dateResolutionConvalidation").setValue(this.editRequest.date_resolution_convalidation);
    this.editRequestForm.get("requestDataForm").get("entityId").setValue(this.editRequest.IdEntity);


    this.showEditProcedureForm = true;
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
        observations: clarificationForm.observation,
        clarification_types_motives: "false/false/false/false/false",
        negation_causes: " ",
        other_negation_causes: " ",
        recurrent_argument: " ",
        consideration: " ",
        exposed_merits: " ",
        articles: " ",
        additional_information: " ",
        paragraph_MA: " ",
        paragraph_JMA1: " ",
        paragraph_JMA2: " ",
        paragraph_AMA: " ",
    }

      console.log("tracking a enviar", tracking);

      await lastValueFrom(this.trackingService.addTracking(tracking));


      this.popUp.successAlert("Solicitud realizada exitosamente. Puede abandonar la página.", 4000);


    } catch (e) {
      console.log(e)
      this.popUp.errorAlert("A ocurrido un error al guardar la aclaración.", 4000);
    }
  }


  public async saveEditProcedute(): Promise<void> {
    try {
      //guardar
      // tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: 19,
        IdProcedureRequest: this.editRequest.idProcedureRequest,
        IdUser: "idUserQuemado",
        dateTracking: new Date(Date.now()),
        observations: "Subsanación por usuario externo",
        clarification_types_motives: "false/false/false/false/false",
        negation_causes: " ",
        other_negation_causes: " ",
        recurrent_argument: " ",
        consideration: " ",
        exposed_merits: " ",
        articles: " ",
        additional_information: " ",
        paragraph_MA: " ",
        paragraph_JMA1: " ",
        paragraph_JMA2: " ",
        paragraph_AMA: " ",
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
