import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {ArchiveService, PopUpService} from "../../../../core/services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";

import {lastValueFrom, Observable, Subscription} from "rxjs";
import {Router, UrlTree} from "@angular/router";
import {OnExit} from "../../../../core/guards/pending-changes.guard";
import {ROUTES} from "../../../../core/enums";
import {ProcedureRequestBackDto} from "../../../../core/models/procedureRequestBack.model";
import {RequestService} from "../../../../core/services/request.service";
import {DocumentSupportDto} from "../../../../core/models/documentSupportDto.model";
import {DocumentsService} from "../../../../core/services/documents.service";
import {TrackingRequestDto} from "../../../../core/models/trackingRequestDto";
import {TrackingService} from "../../../../core/services/tracking.service";
import {CustomValidators} from "../../../../core/utils/custom-validators";
import {AuthService} from "../../../../core/services/auth.service";
import {CurrentUserDto} from "../../../../core/models/currentUserDto";
import {RegisterService} from "../../../../core/services/register.service";
import {AttachmentService} from "../../../../core/services/attachment.service";

/**
 * Componente que moldea la página de la solicitud del ciudadano
 */
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent extends AppBaseComponent implements OnInit, OnExit {

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
        instituteId: ['', [Validators.required]],
        professionId: ['', [Validators.required]],
        diplomaNumber: ['', [Validators.pattern("^[0-9]*$")]],
        graduationCertificate: ['', []],
        endDate: ['', [Validators.required, super.dateValidator]],
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
    })
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

  public redirectionDashboard(): void {
    this.route.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.CITIZEN + "/" + ROUTES.PERSON_DASHBOARD);
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
      html: `<img alt='registro-titulos' src='${this.rutaImagenPopUpInicial}' style="width: 100%;">`,
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

      //obtiene la info del instituto seleccionado
      let infoInstitute = requestDataForm.instituteId;
      infoInstitute = infoInstitute.split(",")

      //obtiene la info de la profesion seleccionada
      let infoProfession = requestDataForm.professionId;
      infoProfession = infoProfession.split(",")

      //Valida si el countryId tiene un valor, por defecto coloca el de colombia
      if (!requestDataForm.countryId) {
        requestDataForm.countryId = 170;
      }

      let dtoProcedure: ProcedureRequestBackDto;


      dtoProcedure = {
        IdTitleTypes: requestDataForm.titleTypeId,
        IdStatus_types: 13,
        IdInstitute: infoInstitute[0],
        name_institute: infoInstitute[1] + ',' + infoInstitute[2],
        IdProfessionInstitute: infoProfession[0],
        name_profession: infoProfession[1]+ ',' + infoProfession[2],
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
        filed_date: new Date(Date.now())
      }

      console.log("dto a enviar", dtoProcedure);

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
          `Soporte_${newFile.docDescription}`,
          `oid${this.currentUser.codeVentanilla}_${newFile.docDescription}`))
          .then(resp => {
            this.popupAlert.infoAlert("Subiendo archivos...", 500);
          });

        documentsSave.push({
          IdDocumentType: newFile.docTypeId,
          IdProcedureRequest: idProcedureRequest,
          path: `oid${this.currentUser.codeVentanilla}_${newFile.docDescription}/Soporte_${newFile.docDescription}`,
          is_valid: true,
          registration_date: new Date(Date.now()),
          modification_date: new Date(Date.now())
        })

      }

      console.log("documentos a enviar", documentsSave);
      await lastValueFrom(this.documentsService.addDocumentsToRequest(documentsSave));
      console.log("se guardaron documentos");

      //guardar tracking
      let tracking: TrackingRequestDto;

      tracking = {
        IdStatusTypes: 13,
        IdProcedureRequest: idProcedureRequest,
        IdUser: this.currentUser.userId,
        dateTracking: new Date(Date.now()),
        observations: "Registro por usuario externo",
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
      nuevoHTML=nuevoHTML.replace('~:~no_radicado~:~',this.numberFiled);

    this.registerService.sendEmail({
      to: this.currentUser.email.toLowerCase(),
      subject: 'Notificación de Creacion de solicitud',
      body: nuevoHTML
    });

  }


  //Not Implemented
  onExit(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const rta = confirm('Are you sure?');
    return rta;

    /*

    if (this.sending == true) {
      this.confirmDialog('seguro de que desea salir?').then(r => {
        console.log(r)
        return r;
      }).catch(e => {
        console.log('entré al catch', e)
        return false;
      })

      //Swal.fire('No puedes salir de la página ya que se está guardando el formulario.');
      /*console.log('no puedes salir')
      let aqui = window.confirm("Quieres salir?")
      console.log(aqui)
      return aqui*/

    /*
          Swal.fire({
            text: 'salir',
            showConfirmButton: true,
          }).then( result => {
            if(result.isConfirmed){
              console.log('entre en el then')
              exit = true;
              return false;
            } else {
              return true;
            }
          })
        }else {
          console.log('retornare algo')
          return exit;
        }
  } else {
    console.log('retornare algo2')
    return false;
  }*/


  }

  public confirmDialog(msg: any) {
    return new Promise(function (resolve, reject) {
      let confirmed = window.confirm(msg);

      return confirmed ? resolve(true) : reject(false);
    });
  }

}
