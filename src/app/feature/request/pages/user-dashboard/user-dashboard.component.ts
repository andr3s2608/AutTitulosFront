import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {lastValueFrom} from "rxjs";
import {
  RequestService,
  TrackingService,
  ArchiveService,
  PopUpService,
  DocumentsService,
  AuthService,
  AttachmentService
} from "@core-app/services";
import {AppBaseComponent} from "@core-app/utils";
import {CustomValidators} from "@core-app/utils/custom-validators";
import {DocumentSupportDto, TrackingRequestDto, ProcedureRequestBackDto, CurrentUserDto} from "@core-app/models";

/**
 * Componente para la bandeja del ciudadano con las solicitudes realizadas
 */
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
  public allByUser: any;

  /**
   * Filtado de lista de las solicitudes
   */
  public filterAllByUser: any;

  /**
   * Lista de seguimiento de una solicitud
   */
  public trackingRequest: any[] = [];
  /**
   * Atributo para paginador, items por página
   */
  public pageSizePaginator: number = 5;

  /**
   * Atributo para paginador, número de pagina actual
   */
  public pageNumberPaginator: number = 1;

  /**
   * Número total de solicitudes
   */
  public totalRequests: number = 0;
  /**
   * recargar paginador
   */
  public showpaginator: boolean = true;


  /**
   * Filtros de busqueda
   */
  public lastfilters: any = {
    finaldate: "",
    texttosearch: " ",
    selectedfilter: " ",
    pagenumber: this.pageNumberPaginator,
    pagination: this.pageSizePaginator
  }

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * Formulario de los datos de la busqueda
   */
  public userdashboard: FormGroup;
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

  /**
   * Info de la solicitud
   */
  public filter: number = 0;

  public editRequest: any;

  /**
   * Usuario actual en la solicitud
   */
  public currentUser: CurrentUserDto;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private trackingService: TrackingService,
              private popUp: PopUpService,
              private documentsService: DocumentsService,
              private authService: AuthService,
              public archiveService: ArchiveService,
              private attachmentService: AttachmentService) {
    super();
    this.stepAdvanceLine = 4;
    this.currentProgressAdvanceLine = 94;
    this.showDashboard = true;
    this.showDisclaimerForm = false;
    this.showEditProcedureForm = false;

    this.userdashboard = this.fb.group({
      selector: [''],
      selectorrole: [localStorage.getItem('Role')],
      textfilter: [''],
      pageSize: [this.pageSizePaginator],
      pageNumber: [this.pageNumberPaginator],
    });

    this.requestClarificationForm = this.fb.group({
      clarificationForm: this.fb.group({
        reasonTypeId: ["", Validators.required],
        fileSupport: [],
        observation: ["", Validators.required]
      })
    });

    this.editRequestForm = this.fb.group({
      editObservationsForm: this.fb.group({
        idProcedure: ['', [Validators.required]],
        observations: ['', [Validators.required]],
      }),
      requestDataForm: this.fb.group({
        idProcedure: ['', [Validators.required]],
        titleTypeId: ['', [Validators.required]],
        instituteId: [''],
        instituteName: [''],
        professionId: ['', [Validators.required]],
        professionName: [''],
        diplomaNumber: ['', [Validators.pattern("^[0-9]*$")]],
        graduationCertificate: ['', []],
        endDate: ['', [Validators.required, CustomValidators.dateValidator]],
        book: ['', []],
        folio: ['', []],
        yearTitle: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$"), CustomValidators.numberDateFuture]],
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
    this.currentUser = this.authService.getCurrentUser();
    this.popUp.infoAlert("Cargando solicitudes", 2000);

    let date: Date = new Date(Date.now());

    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", {year: "numeric"});
    let month = date.toLocaleString("default", {month: "2-digit"});
    let day = date.toLocaleString("default", {day: "2-digit"});

    // Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;


    this.requestService.getDashboardbyidUser(
      formattedDate + "",
      "" + " ",
      "" + " ",
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`,
      this.currentUser.userId, this.filter)
      .subscribe(resp => {
        this.allByUser = resp.data;
        this.totalRequests = resp.count;
        this.filterAllByUser = resp.data
        this.filter = 0;
      });

    this.lastfilters = {
      finaldate: formattedDate + "",
      texttosearch: "" + " ",
      selectedfilter: "" + " ",
      pagenumber: `${this.pageNumberPaginator}`,
      pagination: `${this.pageSizePaginator}`,
    }
  }

  /**
   * Filtra la tabla para ocultar/mostrar solicitudes solucionadas
   * @param filter 0 para recientes,
   *               1 para solucionados
   */
  public filterTable(filter: number, type: number): void {
    this.filter = filter;
    this.getDashboard(type);
  }

  public getDashboard(id: number): void {
    let selector = this.userdashboard.get('selector').value;
    let text = this.userdashboard.get('textfilter').value;

    this.userdashboard.get('pageNumber').setValue(1);

    let date: Date = new Date(Date.now());

    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", {year: "numeric"});
    let month = date.toLocaleString("default", {month: "2-digit"});
    let day = date.toLocaleString("default", {day: "2-digit"});
    if (id === 0) {
      this.pageNumberPaginator = 1;
      this.showpaginator = false;
      //this.showpaginator=true;
      // Generate yyyy-mm-dd date string
      let formattedDate = year + "-" + month + "-" + day;
      this.requestService.getDashboardbyidUser(
        formattedDate + "",
        (text == null || text == "") ? " " : text,
        (selector == null || selector == "") ? " " : selector,
        `${this.pageNumberPaginator}`,
        `${this.pageSizePaginator}`, this.currentUser.userId, this.filter).subscribe(resp => {
        this.filterAllByUser = resp.data;

        this.totalRequests = resp.count;
        this.showpaginator = true;

      });

      this.lastfilters = {
        finaldate: formattedDate + "",
        texttosearch: (text == null || text == "") ? " " : text,
        selectedfilter: (selector == null || selector == "") ? " " : selector,
        pagenumber: `${this.pageNumberPaginator}`,
        pagination: `${this.pageSizePaginator}`
      }
    } else {
      this.requestService.getDashboardbyidUser(
        this.lastfilters.finaldate + "",
        this.lastfilters.texttosearch + "",
        this.lastfilters.selectedfilter + "",
        `${this.pageNumberPaginator}`,
        `${this.pageSizePaginator}`,
        this.currentUser.userId, this.filter).subscribe(resp => {
        this.filterAllByUser = resp.data;

        this.totalRequests = resp.count;

      });
    }


  }

  public changePage(e: PageEvent): void {
    console.log(e);
    this.pageSizePaginator = e.pageSize;
    this.pageNumberPaginator = e.pageIndex + 1;
    this.filterTable(this.filter, 1);
  }


  /**
   * Carga la lista de seguimiento de una solicitud
   * @param idRequest
   */
  public async loadTrackingProcedure(idRequest: number): Promise<void> {
    await lastValueFrom(this.trackingService.getTrackingbyid(String(idRequest)))
      .then(value => this.trackingRequest = value.data)
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

    await lastValueFrom(this.requestService.getRequestbyid(String(idProcedure))).then(value => {
      this.editRequest = value
    })
    await this.loadTrackingProcedure(idProcedure);


    this.editRequestForm.get("editObservationsForm").get("idProcedure").setValue(this.editRequest.filed_number);
    this.editRequestForm.get("editObservationsForm").get("observations").setValue(this.trackingRequest[this.trackingRequest.length - 1].additional_information);
    this.editRequestForm.get("editObservationsForm").disable();

    this.editRequestForm.get("requestDataForm").get("idProcedure").setValue(this.editRequest.filed_number);
    this.editRequestForm.get("requestDataForm").get("titleTypeId").setValue(this.editRequest.idTitleTypes);
    this.editRequestForm.get("requestDataForm").get("instituteId").setValue([this.editRequest.idInstitute, this.editRequest.name_institute]);
    this.editRequestForm.get("requestDataForm").get("professionId").setValue([this.editRequest.idProfessionInstitute, this.editRequest.name_profession]);
    this.editRequestForm.get("requestDataForm").get("diplomaNumber").setValue(this.editRequest.diploma_number);
    this.editRequestForm.get("requestDataForm").get("graduationCertificate").setValue(this.editRequest.graduation_certificate);
    this.editRequestForm.get("requestDataForm").get("endDate").setValue(formatDate(new Date(this.editRequest.end_date), 'yyyy-MM-dd', 'en'));
    this.editRequestForm.get("requestDataForm").get("book").setValue(this.editRequest.book);
    this.editRequestForm.get("requestDataForm").get("folio").setValue(this.editRequest.folio);
    this.editRequestForm.get("requestDataForm").get("yearTitle").setValue(this.editRequest.year_title);
    this.editRequestForm.get("requestDataForm").get("professionalCard").setValue(this.editRequest.professional_card);
    this.editRequestForm.get("requestDataForm").get("nameInternationalUniversity").setValue(this.editRequest.name_institute);
    this.editRequestForm.get("requestDataForm").get("countryId").setValue(this.editRequest.idCountry);
    this.editRequestForm.get("requestDataForm").get("numberResolutionConvalidation").setValue(this.editRequest.number_resolution_convalidation);
    this.editRequestForm.get("requestDataForm").get("dateResolutionConvalidation").setValue(this.editRequest.date_resolution_convalidation);
    this.editRequestForm.get("requestDataForm").get("entityId").setValue(this.editRequest.IdEntity);

    if (this.editRequest.professional_card) {
      this.attachmentService.setShowProfessionalCard(true);
    }

    if (this.editRequest.number_resolution_convalidation) {
      this.attachmentService.setShowValidationResolution(true);
    }

    this.showEditProcedureForm = true;
    this.showDashboard = false;
  }


  /**
   * Guarda la solicitud de aclaración o reposición
   */
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

      console.log("formData", formData)

      if (clarificationForm.fileSupport == null) {
        this.popUp.errorAlert(
          'No ha cargado el soporte de recurso de reposición ó solicitar aclaración, ¡revise por favor!',
          4000);
        return;
      }

      this.sending = true;

      let documentsSave: DocumentSupportDto[] = [];


      await lastValueFrom(this.archiveService.saveFileBlobStorage(
        clarificationForm.fileSupport,
        `Soporte_ReposicionAclaracion`,
        `oid${this.currentUser.codeVentanilla}_ReposicionAclaracion`))
        .then(resp => {
          this.popUp.infoAlert("Subiendo archivos...", 500);
        });

      documentsSave.push({
        IdDocumentType: 6,
        IdProcedureRequest: this.infoRequest.idProcedure,
        path: `oid${this.currentUser.codeVentanilla}_ReposicionAclaracion/Soporte_ReposicionAclaracion`,
        is_valid: true,
        registration_date: new Date(Date.now()),
        modification_date: new Date(Date.now())
      })


      await lastValueFrom(this.documentsService.addDocumentsToRequest(documentsSave));


      //guardar tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: clarificationForm.reasonTypeId,
        IdProcedureRequest: this.infoRequest.idProcedure,
        IdUser: this.currentUser.userId,
        dateTracking: new Date(Date.now()),
        observations: clarificationForm.observation.toUpperCase(),
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

      await lastValueFrom(this.trackingService.addTracking(tracking));
      this.popUp.successAlert("Solicitud realizada exitosamente. Puede abandonar la página.", 4000);

    } catch (e) {
      this.popUp.errorAlert("A ocurrido un error al guardar la aclaración.", 4000);
    }
  }


  /**
   * Guarda la edición de la solicitud
   */
  public async saveEditProcedute(): Promise<void> {
    try {
      //guardar
      const formData = this.editRequestForm.value;
      const requestDataForm = formData['requestDataForm'];
      const attachmentForm = formData['attachmentForm'];

      if (!this.editRequestForm.valid) {
        this.popUp.errorAlert(`Por favor, revise el formulario de la solicitud, hay datos inválidos y/o incompletos.`, 4000);
        console.log("FORMULARIO PROCESADO");
        console.log(this.editRequestForm.value);
        console.log("ERRORES FORMULARIO");
        console.log(super.getAllErrors(this.editRequestForm));
        this.editRequestForm.markAllAsTouched();
        return;
      }

      if (attachmentForm.documentSupports.length < attachmentForm.quantityDocuments) {
        this.popUp.errorAlert('Hay requisitos sin documentos adjuntos, ¡revise por favor!', 4000);
        return;
      }

      this.popUp.infoAlert(`Registrando solicitud, espere por favor.`, 5000);

      //Valida si el countryId tiene un valor, por defecto coloca el de colombia
      if (!requestDataForm.countryId) {
        requestDataForm.countryId = 170;
      }

      if (requestDataForm.titleTypeId == 2) {
        requestDataForm.instituteName = requestDataForm.nameInternationalUniversity;
      }

      let dtoProcedure: ProcedureRequestBackDto;

      dtoProcedure = {
        IdProcedureRequest: this.editRequest.idProcedureRequest,
        IdTitleTypes: requestDataForm.titleTypeId,
        IdStatus_types: 19,
        IdInstitute: requestDataForm.instituteId,
        name_institute: requestDataForm.instituteName,
        IdProfessionInstitute: requestDataForm.professionId,
        name_profession: requestDataForm.professionName,
        last_status_date: new Date(Date.now()),
        IdUser: this.currentUser.userId,
        user_code_ventanilla: this.currentUser.codeVentanilla,
        AplicantName: this.currentUser.fullName,
        IdDocument_type: this.currentUser.documentType,
        IdNumber: this.currentUser.documentNumber,
        diploma_number: requestDataForm.diplomaNumber,
        graduation_certificate: requestDataForm.graduationCertificate,
        end_date: requestDataForm.endDate,
        book: requestDataForm.book,
        folio: requestDataForm.folio,
        year_title: requestDataForm.yearTitle,
        professional_card: requestDataForm.professionalCard,
        IdCountry: requestDataForm.countryId,
        number_resolution_convalidation: requestDataForm.numberResolutionConvalidation,
        date_resolution_convalidation: requestDataForm.dateResolutionConvalidation,
        IdEntity: requestDataForm.entityId,
        filed_date: this.editRequest.filed_date,
        filed_number: this.editRequest.filed_number
      }

      await lastValueFrom(this.requestService.updateRequest(dtoProcedure));


      //guardar documentos

      let documentsSave: DocumentSupportDto[] = [];


      for (let i: number = 0; i < attachmentForm.documentSupports; i++) {

        let newFile = attachmentForm.documentSupports[i];
        await lastValueFrom(this.archiveService.saveFileBlobStorage(
          newFile.content,
          `Soporte_${newFile.docDescription}`,
          `oid${this.currentUser.codeVentanilla}_${newFile.docDescription}`))
          .then(resp => {
            this.popUp.infoAlert("Subiendo archivos...", 500);
          });

        documentsSave.push({
          IdDocumentTypeProcedureRequest: newFile.idDocumentTypeProcedureRequest,
          IdDocumentType: newFile.docTypeId,
          IdProcedureRequest: this.editRequest.idProcedureRequest,
          path: `oid${this.currentUser.codeVentanilla}_${newFile.docDescription}/Soporte_${newFile.docDescription}`,
          is_valid: true,
          registration_date: new Date(Date.now()),
          modification_date: new Date(Date.now())
        })

      }


      await lastValueFrom(this.documentsService.updateDocumentsByIdRequest(documentsSave));


      // tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: 19,
        IdProcedureRequest: this.editRequest.idProcedureRequest,
        IdUser: this.currentUser.userId,
        dateTracking: new Date(Date.now()),
        observations: "Subsanación por usuario externo".toUpperCase(),
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

      await lastValueFrom(this.trackingService.addTracking(tracking));
      this.popUp.successAlert("Solicitud realizada exitosamente. Puede abandonar la página.", 4000);

    } catch (e) {
      console.log(e);
      this.popUp.errorAlert("A ocurrido un error al guardar la aclaración.", 4000);
    }

  }

  public cleanStringObservations(observation: string): string {
    return observation.includes("null") ? "" : observation;
  }

}
