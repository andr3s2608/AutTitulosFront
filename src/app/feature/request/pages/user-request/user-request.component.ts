import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {lastValueFrom, Subscription} from "rxjs";

import Swal from "sweetalert2";
import {ArchiveService, PopUpService, RequestService, DocumentsService, TrackingService, AuthService, RegisterService, AttachmentService} from "@core-app/services";
import {ProcedureRequestBackDto, DocumentSupportDto, TrackingRequestDto, CurrentUserDto} from "@core-app/models";
import {AppBaseComponent} from "@core-app/utils";
import {ROUTES} from "@core-app/enums";
import {CustomValidators} from "@core-app/utils/custom-validators";

/**
 * Componente que moldea la página de la solicitud del ciudadano
 */
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent extends AppBaseComponent implements OnInit {

  /**
   * Ruta de la imagen del popup inicial
   */
  private readonly rutaImagenPopUpInicial: string;

  /**
   * Ruta del pdf con el listado de instituciones
   */
  private readonly rutaPdfListadoInstituciones: string;

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * Centinela que habilita el formulario de la solicitud
   */
  public showRequestForm: boolean;

  /**
   * Centinela que habilita la pantalla de solicitud creada
   */
  public showResumeRequestSaved: boolean;

  /**
   * Centinela que indica si la solicitud se está guardando
   */
  public sending: boolean;

  /**
   * Cadena que modela el numero de radicado cuando se guarda la solicitud
   */
  public numberFiled: string;

  /**
   * Formulario reactivo de la solicitud
   */
  public requestForm: FormGroup;

  /**
   * Usuario actual en la solicitud
   */
  public currentUser: CurrentUserDto;

  /**
   * Subscripcion para el subject de professionalCard
   */
  private subscriptionProfessionalCard: Subscription;

  /**
   * Subscripcion para cambiar el formulario de nacional o extranjero
   */
  private subscriptionFormInternacional: Subscription;

  constructor(private archiveService: ArchiveService,
              private popupAlert: PopUpService,
              private requestService: RequestService,
              public registerService: RegisterService,
              private documentsService: DocumentsService,
              private trackingService: TrackingService,
              private fb: FormBuilder,
              private route: Router,
              private authService: AuthService,
              private attachmentService: AttachmentService) {
    super();
    this.rutaImagenPopUpInicial = './assets/images/infografia-popup-inicial.jpg'
    this.rutaPdfListadoInstituciones = './assets/binaries/listado.pdf'
    this.stepAdvanceLine = 2;
    this.currentProgressAdvanceLine = 28;
    this.showRequestForm = false;
    this.showResumeRequestSaved = false;
    this.sending = false;

    this.requestForm = this.fb.group({
      requestDataForm: this.fb.group({
        titleTypeId: ['', [Validators.required]],
        instituteId: [''],
        instituteName: [''],
        professionId: ['', [Validators.required]],
        professionName: [''],
        diplomaNumber: ['',Validators.pattern("^[0-9]*$")],
        graduationCertificate: [''],
        endDate: ['', [Validators.required, CustomValidators.dateValidator]],
        book: ['', []],
        folio: ['', []],
        yearTitle: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$"), CustomValidators.numberDateFuture]],
        professionalCard: [''],
        nameInternationalUniversity: [''],
        countryId: [''],
        numberResolutionConvalidation: [''],
        dateResolutionConvalidation: ['', [Validators.required, CustomValidators.dateValidator]],
        entityId: ['']
      }),
      attachmentForm: this.fb.group({
        quantityDocuments: [],
        documentSupports: [[]]
      })
    });

    this.validatorProfessionalCard();

    this.subscriptionFormInternacional =
      this.attachmentService.showValidationResolution
        .subscribe(value => this.validatorsFormNationalOrInternational(value));
  }

  ngOnInit(): void {

    //Mensaje de confirmacion al intentar recargar o salir de la página si se está guardando la solicitud
    window.addEventListener('beforeunload', (event) => {
      if (this.sending) {
        event.returnValue = '¿Estás seguro de que deseas salir de esta página?';
      }
    });

    this.popUpInicial();
    this.currentUser = this.authService.getCurrentUser();
  }


  /**
   * Lanza popup con la infografia del trámite
   */
  private popUpInicial(): void {
    Swal.fire({
      title: 'Información importante',
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3366CC',
      showDenyButton: true,
      denyButtonText: 'Ver listado',
      denyButtonColor: '#3366CC',
      html: `<img alt='registro-titulos' src='${this.rutaImagenPopUpInicial}' style="width: 90%;">`,
      width: '60%',
    }).then(result => {
      if (result.isDenied) {
        this.archiveService.downloadArchive(this.rutaPdfListadoInstituciones, 'listadoInstituciones', '.pdf');
      }
    });
  }


  /**
   * Guarda la solicitud realizada por el ciudadano
   */
  public async saveRequest(): Promise<void> {

    try {
      const formData = this.requestForm.value;
      const requestDataForm = formData['requestDataForm'];
      const attachmentForm = formData['attachmentForm'];

      if (!this.requestForm.valid) {
        this.popupAlert.errorAlert(`Por favor, revise el formulario de la solicitud, hay datos inválidos y/o incompletos.`, 4000);
        console.log("FORMULARIO PROCESADO");
        console.log(this.requestForm.value);
        console.log("ERRORES FORMULARIO");
        console.log(super.getAllErrors(this.requestForm));
        this.requestForm.markAllAsTouched();
        return;
      }

      if (attachmentForm.documentSupports.length < attachmentForm.quantityDocuments) {
        this.popupAlert.errorAlert(
          'Hay requisitos sin documentos adjuntos, ¡revise por favor!',
          4000);
        return;
      }

      this.popupAlert.infoAlert(
        `Registrando solicitud, espere por favor.`,
        5000
      );

      this.sending = true;

      //Valida si el countryId tiene un valor, por defecto coloca el de colombia
      if (!requestDataForm.countryId) {
        requestDataForm.countryId = 170;
      }

      if (requestDataForm.titleTypeId == 2) {
        requestDataForm.instituteName = requestDataForm.nameInternationalUniversity;
      }

      let dtoProcedure: ProcedureRequestBackDto;


      dtoProcedure = {
        IdTitleTypes: requestDataForm.titleTypeId,
        IdStatus_types: 13,
        IdInstitute: requestDataForm.instituteId != "" ? requestDataForm.instituteId : 0,
        name_institute: requestDataForm.instituteName.toUpperCase(),
        IdProfessionInstitute: requestDataForm.professionId,
        name_profession: requestDataForm.professionName.toUpperCase(),
        last_status_date: new Date(Date.now()),
        IdUser: this.currentUser.userId,
        user_code_ventanilla: this.currentUser.codeVentanilla,
        AplicantName: this.currentUser.fullName.toUpperCase(),
        IdDocument_type: this.currentUser.documentType,
        IdNumber: this.currentUser.documentNumber,
        diploma_number: requestDataForm.diplomaNumber,
        graduation_certificate: requestDataForm.graduationCertificate.toUpperCase(),
        end_date: requestDataForm.endDate,
        book: requestDataForm.book.toUpperCase(),
        folio: requestDataForm.folio.toUpperCase(),
        year_title: requestDataForm.yearTitle,
        professional_card: requestDataForm.professionalCard.toUpperCase(),
        IdCountry: requestDataForm.countryId,
        number_resolution_convalidation: requestDataForm.numberResolutionConvalidation,
        date_resolution_convalidation: requestDataForm.dateResolutionConvalidation,
        IdEntity: requestDataForm.entityId,
        filed_date: new Date(Date.now())
      }


      let idProcedureRequest: number;

      await lastValueFrom(this.requestService.saveRequest(dtoProcedure)).then(requestResponse => {

        this.numberFiled = requestResponse.filedNumber;
        idProcedureRequest = requestResponse.idProcedureRequest;
      });


      //guardar documentos

      let documentsSave: DocumentSupportDto[] = [];


      for (const newFile of attachmentForm.documentSupports) {
        await lastValueFrom(this.archiveService.saveFileBlobStorage(
          newFile.content,
          `Soporte_${newFile.docDescription.replace(/ /g, "_")}`,
          `${this.numberFiled}`))
          .then(resp => {
            this.popupAlert.infoAlert("Subiendo archivos...", 200);
          });

        documentsSave.push({
          IdDocumentType: newFile.docTypeId,
          IdProcedureRequest: idProcedureRequest,
          path: `${this.numberFiled}/Soporte_${newFile.docDescription.replace(/ /g, "_")}`,
          is_valid: true,
          registration_date: new Date(Date.now()),
          modification_date: new Date(Date.now())
        })

      }


      await lastValueFrom(this.documentsService.addDocumentsToRequest(documentsSave));


      //guardar tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: 13,
        IdProcedureRequest: idProcedureRequest,
        IdUser: this.currentUser.userId,
        dateTracking: new Date(Date.now()),
        observations: "Registro por usuario externo".toUpperCase(),
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
        paragraph_AMA: " "
      }


      await lastValueFrom(this.trackingService.addTracking(tracking));

      this.finishProcedure();
    } catch (e) {
      this.popupAlert.errorAlert("A ocurrido un error al guardar la solicitud", 4000);
    }

  }

  /**
   * Realiza operaciones finales despues de guardada la solicitud
   */
  private async finishProcedure(): Promise<void> {
    this.popupAlert.successAlert("Solicitud registrada con éxito", 2000);
    this.sending = false;
    this.showRequestForm = false;
    this.showResumeRequestSaved = true;
    this.stepAdvanceLine = 3;
    this.currentProgressAdvanceLine = 60;
    let nuevoHTML = '';

    await lastValueFrom(this.registerService.getFormats("12")).then(requestResponse => nuevoHTML = requestResponse.data.body);


    nuevoHTML = nuevoHTML.replace('~:~no_radicado~:~', this.numberFiled);

    this.registerService.sendEmail({
      to: this.currentUser.email.toLowerCase(),
      subject: 'Notificación de Creacion de solicitud',
      body: nuevoHTML
    }).subscribe();

  }

  /**
   * Se subscribe al observable de professional card para modificar las validaciones de professional card en el formulario
   */
  private validatorProfessionalCard(): void {
    this.subscriptionProfessionalCard = this.attachmentService.showProfessionalCard.subscribe({
      next: value => {
        if (value) {
          this.requestForm.get("requestDataForm.professionalCard").setValidators([Validators.required]);
        } else {
          this.requestForm.get("requestDataForm.professionalCard").clearValidators();
          this.requestForm.get("requestDataForm.professionalCard").setErrors(null);
          this.requestForm.get("requestDataForm.professionalCard").updateValueAndValidity();
          this.requestForm.get("requestDataForm.professionalCard").setValue("");
        }
      }
    });
  }

  /**
   * Agrega o elimina las validaciones para los titulos nacional o internacionales
   * @param showInternational True si agrega validaciones al titulo internacional, false para el nacional
   */
  private validatorsFormNationalOrInternational(showInternational: boolean): void {
    if (showInternational) {
      this.setValitadorsNational(false);
      this.setValidatorsInternational(true);
    } else {
      this.setValidatorsInternational(false);
      this.setValitadorsNational(true);
    }
  }


  /**
   * Agrega o elimina las validaciones referentes al titulo nacional
   * @param addValitadors True para agregar, false para remover
   */
  private setValitadorsNational(addValitadors: boolean): void {
    if (addValitadors) {
      this.requestForm.get('requestDataForm.instituteId').setValidators([Validators.required]);
      return;
    }
    this.requestForm.get("requestDataForm.instituteId").clearValidators();
    this.requestForm.get("requestDataForm.instituteId").setErrors(null);
    this.requestForm.get("requestDataForm.instituteId").updateValueAndValidity();
    this.requestForm.get("requestDataForm.instituteId").setValue("");
    this.requestForm.get("requestDataForm.diplomaNumber").setValue("");
    this.requestForm.get("requestDataForm.graduationCertificate").setValue("");
    this.requestForm.get("requestDataForm.book").setValue("");
    this.requestForm.get("requestDataForm.folio").setValue("");
  }


  /**
   * Agrega o elimina las validaciones referentes al titulo internacional
   * @param  addValitadors True para agregar, false para remover
   */
  private setValidatorsInternational(addValitadors: boolean): void {
    if (addValitadors) {
      this.requestForm.get('requestDataForm.nameInternationalUniversity').setValidators([Validators.required]);
      this.requestForm.get('requestDataForm.countryId').setValidators([Validators.required]);
      this.requestForm.get('requestDataForm.numberResolutionConvalidation').setValidators([Validators.required]);
      this.requestForm.get('requestDataForm.dateResolutionConvalidation').setValidators([Validators.required,CustomValidators.dateValidator]);
      this.requestForm.get('requestDataForm.entityId').setValidators([Validators.required]);
      return;
    }

    this.requestForm.get('requestDataForm.nameInternationalUniversity').clearValidators();
    this.requestForm.get('requestDataForm.nameInternationalUniversity').setErrors(null);
    this.requestForm.get('requestDataForm.nameInternationalUniversity').updateValueAndValidity();
    this.requestForm.get('requestDataForm.nameInternationalUniversity').setValue("");

    this.requestForm.get('requestDataForm.countryId').clearValidators();
    this.requestForm.get('requestDataForm.countryId').setErrors(null);
    this.requestForm.get('requestDataForm.countryId').updateValueAndValidity();
    this.requestForm.get('requestDataForm.countryId').setValue("");

    this.requestForm.get('requestDataForm.numberResolutionConvalidation').clearValidators();
    this.requestForm.get('requestDataForm.numberResolutionConvalidation').setErrors(null);
    this.requestForm.get('requestDataForm.numberResolutionConvalidation').updateValueAndValidity();
    this.requestForm.get('requestDataForm.numberResolutionConvalidation').setValue("");

    this.requestForm.get('requestDataForm.dateResolutionConvalidation').clearValidators();
    this.requestForm.get('requestDataForm.dateResolutionConvalidation').setErrors(null);
    this.requestForm.get('requestDataForm.dateResolutionConvalidation').updateValueAndValidity();
    this.requestForm.get('requestDataForm.dateResolutionConvalidation').setValue("");

    this.requestForm.get('requestDataForm.entityId').clearValidators();
    this.requestForm.get('requestDataForm.entityId').setErrors(null);
    this.requestForm.get('requestDataForm.entityId').updateValueAndValidity();
    this.requestForm.get('requestDataForm.entityId').setValue("");
  }

  protected readonly ROUTES = ROUTES;
}
