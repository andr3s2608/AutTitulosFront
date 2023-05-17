import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArchiveService, PopUpService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";
import {ProcedureValidation, UserValidation} from "../../../../core/models";
import {formatDate} from "@angular/common";
import {RegisterService} from "../../../../core/services/register.service";
import {TrackingService} from "../../../../core/services/tracking.service";
import {DocumentsService} from "../../../../core/services/documents.service";

import {RequestService} from "../../../../core/services/request.service";
import {ResolutionService} from "../../../../core/services/resolution.service";
import {ROUTES} from "../../../../core/enums";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {toBoolean, toNumber} from "ng-zorro-antd/core/util";
import {lastValueFrom, switchMap} from "rxjs";
import {CurrentUserDto} from "../../../../core/models/currentUserDto";
import {AuthService} from "../../../../core/services/auth.service";

/**
 * Component que permite validar la información de un trámite
 */
@Component({
  selector: 'app-validation-screen',
  templateUrl: './validation-screen.component.html',
  styleUrls: ['./validation-screen.component.scss']
})
export class ValidationScreenComponent extends AppBaseComponent implements OnInit {

  /**
   * valida desde que pagina se esta accediendo
   */
  public source: string;



  /**
   * Representa el tramite actual a validar
   */
  public tramiteActual: ProcedureValidation;

  /**
   * ultimo seguimiento
   */
  public lasttracking: any = {
    idStatusTypes: 0,
    negationcauses: '',
    othernegationcauses: '',
    recurrentargument: '',
    considerations: '',
    merits: '',
    articles: 'Articulo Primero: /n Articulo Segundo:',
    aditionalinfo: '',
    checkBoxnameserror: false,
    checkBoxprofessionerror: false,
    checkBoxinstitutionerror: false,
    checkBoxdocumenterror: false,
    checkBoxdateerror: false,
    aclarationparagraph: '',
    justificationparagraph1: '',
    justificationparagraph2: '',
    aclarationparagrapharticle: ''
  };


  /**
   * lista de seguimiento
   */
  public tracking: any[] = [];
  /**
   * Representa el usuario tramite actual a validar
   */
  public user: UserValidation;

  /**
   * Representa el usuario tramite actual a validar
   */
  public show: boolean = false;


  /**
   * Formulario padre que agrega toda la validacion de una solicitud
   */
  public validationForm: FormGroup;

  /**
   * nombre que tomara la notificacion
   */
  public notificationtittle: Array<string> = ['Aprobación', 'Desistimiento', 'Aclaración', 'Recurso de Reposición',
    'Subsanación','Negación/Tramite Duplicado Anulado'];

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * rol del usuario actual
   */
  public Role: string;

  /**
   * Funcionario actual validando la solicitud
   */
  public currentValidator: CurrentUserDto;

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public showmodal: boolean=false;

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public archivo: string="";

  constructor(public fb: FormBuilder,

              public registerService: RegisterService,
              public trackingService: TrackingService,
              public documentsService: DocumentsService,
              private archiveService: ArchiveService,
              public requestService: RequestService,
              public resolutiontService: ResolutionService,
              private popupAlert: PopUpService,
              private router: Router,
              private authService: AuthService
             ) {
    super();

    let procedure: string = localStorage.getItem("procedure");
    this.source = localStorage.getItem("source");
    let datatramite: any;

    this.requestService.getRequestbyid(procedure).pipe(
      switchMap(resp => {
        datatramite = resp;
        return this.registerService.getInfoUserByIdCodeVentanilla(datatramite.user_code_ventanilla)
      }),
      switchMap(resp2 => {
        this.loadDataUserRequest(resp2.data, datatramite);
        this.loadTramite(datatramite);
        return this.trackingService.getTrackingbyid(datatramite.idProcedureRequest);
      })
    ).subscribe({
      next: resp3 => {
        this.tracking = resp3.data;

        if (resp3.count > 2) {
          this.lasttracking = this.tracking[this.tracking.length - 1];
        }

        this.loadInfoTramiteActualInForm();
        this.show = true;
      }
    });

    this.currentProgressAdvanceLine = 50;
    this.stepAdvanceLine = 2;
  }

  ngOnInit(): void {
    this.currentValidator = this.authService.getCurrentUser();
  }

  /**
   * Carga la informacion del usuario al que le pertenece el tramite en su respectivo objeto
   * @param dataUser
   * @param datatramite
   */
  private loadDataUserRequest(dataUser: any, datatramite: any): void {
    this.user = {
      tipoDocumento: dataUser.tipoIdentificacion ? dataUser.tipoIdentificacion : 2,
      numeroIdentificacion: dataUser.numeroIdentificacion ? dataUser.numeroIdentificacion : '',
      primerNombre: dataUser.primerNombre ? dataUser.primerNombre : '',
      segundoNombre: dataUser.segundoNombre ? dataUser.segundoNombre : '',
      primerApellido: dataUser.primerApellido ? dataUser.primerApellido : '',
      segundoApellido: dataUser.segundoApellido ? dataUser.segundoApellido : '',
      email: dataUser.email ? dataUser.email : '',
      fechaNacimiento: dataUser.fechaNacimiento ? new Date(dataUser.fechaNacimiento) : new Date(null),
      telefonoFijo: dataUser.telefonoFijo ? dataUser.telefonoFijo : '',
      telefonoCelular: dataUser.telefonoCelular ? dataUser.telefonoCelular : '',
      sexo: dataUser.sexo ? dataUser.sexo : 1,
      genero: dataUser.genero ? dataUser.genero : 1,
      orientacionSexual: dataUser.orientacionSexual ? dataUser.orientacionSexual : 1,
      etnia: dataUser.etnia ? dataUser.etnia : 1,
      estadoCivil: dataUser.estadoCivil ? dataUser.estadoCivil : 1,
      nivelEducativo: dataUser.nivelEducativo ? dataUser.nivelEducativo : 1,
      nacionalidad: dataUser.nacionalidad ? dataUser.nacionalidad : 170,
      departamentoNacimiento: dataUser.nacionalidad ? dataUser.nacionalidad : 1,
      ciudadNacimiento: dataUser.ciudadNacimiento ? dataUser.ciudadNacimiento : 1,
      departamentoResidencia: dataUser.depaResi ? dataUser.depaResi : 3,
      ciudadResidencia: dataUser.ciudadResiciudadResi ? dataUser.ciudadNacimiento : 149,
      idUser: datatramite.idUser + "",
      idUserVentanilla: datatramite.user_code_ventanilla
    }
  }

  /**
   * Carga la informacion del tramite en su respectivo objeto, no confundir con el cargue en el formulario
   * @param datatramite
   */
  private loadTramite(datatramite: any): void {

    this.tramiteActual = {
      id: datatramite.idProcedureRequest,
      user: this.user,
      statusId: datatramite.idStatus_types,
      status: datatramite.status,
      filedNumber: datatramite.filed_number,
      dateRequest: new Date(Date.now()),
      dateTracking: new Date(Date.now()),
      titleTypeId: datatramite.idTitleTypes,
      instituteId: datatramite.idInstitute,
      diplomaNumber: datatramite.idProcedureRequest,
      graduationCertificate: datatramite.idProfessionInstitute,
      endDate: datatramite.end_date,
      book: datatramite.book ? datatramite.book : '',
      folio: datatramite.folio ? datatramite.folio : '',
      yearTitle: datatramite.year_title,
      professionalCard: datatramite.professional_card,
      filed_date: datatramite.filed_date,
      name_institute: datatramite.name_institute,
      idnumber: datatramite.idNumber,
      aplicantnanme: datatramite.aplicantName,
      profesionid: datatramite.idProfessionInstitute,
      name_profesion: datatramite.name_profession
    }

  }

  /**
   * Carga en el formulario la informacion del tramite actual
   */
  private loadInfoTramiteActualInForm(): void {

    let checkbox: any;
    let istrack = false;

    this.Role = localStorage.getItem('Role');
    if (this.lasttracking.idStatusTypes != 0) {

      checkbox = this.lasttracking.clarification_types_motives.split('/');
      istrack = true;
    }

    this.validationForm = this.fb.group({

      informationRequestValidatorForm: this.fb.group({
        filedNumber: [this.tramiteActual.filedNumber, [Validators.required]],
        titleType: ['NACIONAL', [Validators.required]],
        status: [this.tramiteActual.status.toUpperCase(), [Validators.required]],
        assignedUser: [this.currentValidator.fullName.toUpperCase(), [Validators.required]],
        dateRequest: [formatDate(new Date(this.tramiteActual.dateRequest), 'yyyy-MM-dd', 'en'), [Validators.required]]
      }),

      basicDataForm: this.fb.group({
        documentodescripcion: [''],
        tipoDocumento: [this.tramiteActual.user.tipoDocumento, [Validators.required]],
        numeroIdentificacion: [this.tramiteActual.user.numeroIdentificacion.toString().toUpperCase() + "", [Validators.required]],
        primerNombre: [this.tramiteActual.user.primerNombre.toUpperCase(), [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        segundoNombre: [this.tramiteActual.user.segundoNombre.toUpperCase(), [Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        primerApellido: [this.tramiteActual.user.primerApellido.toUpperCase(), [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        segundoApellido: [this.tramiteActual.user.segundoApellido.toUpperCase(), [Validators.minLength(1), Validators.maxLength(50), Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        email: [this.tramiteActual.user.email, [Validators.required, Validators.email, Validators.maxLength(50)]],

        telefonoFijo: [this.tramiteActual.user.telefonoFijo, [Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
        telefonoCelular: [this.tramiteActual.user.telefonoCelular, [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
        fechaNacimiento: [formatDate(new Date(this.tramiteActual.user.fechaNacimiento), 'yyyy-MM-dd', 'en'), [Validators.required, super.dateValidator]],
        sexo: [this.tramiteActual.user.sexo, [Validators.required]],
        genero: [this.tramiteActual.user.genero, [Validators.required]],
        orientacionSexual: [this.tramiteActual.user.orientacionSexual, [Validators.required]],
        etnia: [this.tramiteActual.user.etnia, [Validators.required]],
        estadoCivil: [this.tramiteActual.user.estadoCivil, [Validators.required]],
        nivelEducativo: [this.tramiteActual.user.nivelEducativo, [Validators.required]],
      }),

      geographicDataForm: this.fb.group(
        {
          nacionalidad: [this.tramiteActual.user.nacionalidad, [Validators.required]],
          departamentoResidencia: [this.tramiteActual.user.departamentoResidencia, [Validators.required]],
          ciudadResidencia: [this.tramiteActual.user.ciudadResidencia, [Validators.required]],
          departamentoNacimiento: [this.tramiteActual.user.departamentoNacimiento, [Validators.required]],
          ciudadNacimiento: [this.tramiteActual.user.ciudadNacimiento, [Validators.required]],
        }
      ),
      attachmentform: this.fb.group(
        {
          documentstate: ['']
        }
      ),

      requestDataForm: this.fb.group({
        titleTypeId: [this.tramiteActual.titleTypeId, [Validators.required]],
        instituteId: [[this.tramiteActual.instituteId, this.tramiteActual.name_institute], [Validators.required]],
        professionId: [[this.tramiteActual.profesionid, this.tramiteActual.name_profesion], [Validators.required]],
        diplomaNumber: [this.tramiteActual.diplomaNumber, [Validators.pattern("^[0-9]*$")]],
        graduationCertificate: [this.tramiteActual.graduationCertificate, []],
        endDate: [formatDate(new Date(this.tramiteActual.endDate), 'yyyy-MM-dd', 'en'), [Validators.required, super.dateValidator]],
        book: [this.tramiteActual.book.toUpperCase(), []],
        folio: [this.tramiteActual.folio.toUpperCase(), []],
        yearTitle: [this.tramiteActual.yearTitle, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
        professionalCard: [this.tramiteActual.professionalCard]
      }),

      validationstateform: this.fb.group({
        selectedstatus: [1],
        status: ['Aprobacion'],
        internalobservations: [''],
        negationcauses: [this.lasttracking.negation_causes],
        othernegationcauses: [this.lasttracking.other_negation_causes],
        recurrentargument: [this.lasttracking.recurrent_argument],
        considerations: [this.lasttracking.consideration],
        merits: [this.lasttracking.exposed_merits],
        articles: [this.lasttracking.articles],
        aditionalinfo: [this.lasttracking.additional_information],
        checkBoxnameserror: [istrack ? toBoolean(checkbox[0]) : false],
        checkBoxprofessionerror: [istrack ? toBoolean(checkbox[1]) : false],
        checkBoxinstitutionerror: [istrack ? toBoolean(checkbox[2]) : false],
        checkBoxdocumenterror: [istrack ? toBoolean(checkbox[3]) : false],
        checkBoxdateerror: [istrack ? toBoolean(checkbox[4]) : false],
        aclarationparagraph: [this.lasttracking.paragraph_MA],
        justificationparagraph1: [this.lasttracking.paragraph_JMA1],
        justificationparagraph2: [this.lasttracking.paragraph_JMA2],
        aclarationparagrapharticle: [this.lasttracking.paragraph_AMA],

      }),
    })

    this.validationForm.get('informationRequestValidatorForm').disable();
    this.validationForm.get('basicDataForm.numeroIdentificacion').disable();
    if(this.Role==='Subdirector' || this.source=='Reports')
    {
      this.validationForm.get('basicDataForm').disable();
      this.validationForm.get('requestDataForm').disable();
      this.validationForm.get('geographicDataForm').disable();
      this.validationForm.get('attachmentform').disable();

    }
  }

  /**
   * Crea una resolución preeliminar para los funcionarios
   */
  public async preliminar(): Promise<void> {

    const status = this.validationForm.get('validationstateform.status').value;
    let preliminarresolution = true;

    console.log(status);
    let statustogenerate = "";
    const estados: Array<string> = ['Aprobado', 'Negado', 'aclaración', 'reposición'];
    const estadosbd: Array<string> = ['Aprobación', 'Negación', 'Aclaración', 'Reposición'];
    const ultimosestados: Array<string> = ['4', '5', '10', '6'];


    for (let i = 0; i <estados.length ; i++) {
      if (status.includes(estados[i])) {
        statustogenerate = estadosbd[i];
      }
    }

    if (status.includes("Firmar")) {
      let laststatus = this.tramiteActual.statusId + "";

      for (let i = 0; i < ultimosestados.length; i++) {

        if (laststatus.includes(ultimosestados[i])) {
          statustogenerate = estadosbd[i];
        }
      }
    }
  console.log(statustogenerate)
    if (statustogenerate === "") {
      this.popupAlert.infoAlert(`Por favor, revise el estado que desea previzualizar.`, 4000);
    } else {
      this.popupAlert.infoAlert(`Por favor espere mientras se genera el documento...`, 10000);

      this.documentsService.getResolutionPdf(this.tramiteActual.id + "",
        statustogenerate,
        this.Role + "",
        this.validationForm.get('validationstateform.aclarationparagraph').value + " ",
        this.validationForm.get('validationstateform.justificationparagraph1').value +
        this.validationForm.get('validationstateform.justificationparagraph2').value + " ",
        this.validationForm.get('validationstateform.aclarationparagrapharticle').value + " ",
        preliminarresolution
      ).subscribe(resp => {
        let fileObtenido = resp.data;
        const byteArray: Uint8Array = new Uint8Array(atob(fileObtenido).split('').map((char) => char.charCodeAt(0)));
        const file: Blob = new Blob([byteArray], {type: 'application/pdf'});
        this.archiveService.viewArchiveInPopUp("", file);
      });
    }
  }


  public async saveRequest(): Promise<void> {

    if (!this.validationForm.valid) {

      this.popupAlert.errorAlert(
        `Por favor, revise el formulario de la solicitud, hay datos inválidos y/o incompletos.`,
        4000
      );
      console.log("FORMULARIO PROCESADO");
      console.log(this.validationForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.validationForm));
      this.validationForm.markAllAsTouched();
       }

    const estadosbd: Array<string> = ['Aprobación', 'Negación', 'Aclaración', 'Reposición'];
    const ultimosestados: Array<string> = ['4', '5', '10', '6'];
    const estadofinalfirmado: Array<number> = [16, 17, 18, 20];

    let status = -1;

    for (let i = 0; i < ultimosestados.length; i++) {
      if ((this.tramiteActual.statusId + '').includes(ultimosestados[i])) {
        status = i;
      }
    }


    const aplicantname = this.validationForm.get('basicDataForm.primerNombre').value.toString().toUpperCase() + " " +
      (this.validationForm.get('basicDataForm.segundoNombre').value.toString() + "").toUpperCase() +
      this.validationForm.get('basicDataForm.primerApellido').value.toString().toUpperCase() + " " +
      (this.validationForm.get('basicDataForm.segundoApellido').value.toString() + "").toUpperCase();

    const idistitute = (this.validationForm.get('requestDataForm.instituteId').value + "").split(",");
    const idprofesion = (this.validationForm.get('requestDataForm.professionId').value + "").split(",");


    let selectedstatus = this.validationForm.get('validationstateform.selectedstatus').value != 11 ?
      this.validationForm.get('validationstateform.selectedstatus').value : estadofinalfirmado[status];

    const json: any = {
      IdProcedureRequest: this.tramiteActual.id,
      IdTitleTypes: this.validationForm.get('requestDataForm.titleTypeId').value,
      IdStatus_types: selectedstatus,
      IdInstitute: idistitute[0],
      IdProfessionInstitute: idprofesion[0],
      IdUser: this.tramiteActual.user.idUser,
      user_code_ventanilla: this.tramiteActual.user.idUserVentanilla,
      filed_number: this.tramiteActual.filedNumber,
      //IdProfession:this.validationForm.get('requestDataForm.professionId').value,
      diploma_number: this.validationForm.get('requestDataForm.diplomaNumber').value,
      graduation_certificate: this.validationForm.get('requestDataForm.graduationCertificate').value,
      end_date: this.validationForm.get('requestDataForm.endDate').value,
      book: this.validationForm.get('requestDataForm.book').value,
      folio: this.validationForm.get('requestDataForm.folio').value,
      year_title: this.validationForm.get('requestDataForm.yearTitle').value,
      professional_card: this.validationForm.get('requestDataForm.professionalCard').value,
      IdCountry: 170,
      number_resolution_convalidation: "",
      date_resolution_convalidation: new Date(Date.now()),
      IdEntity: 1,
      name_institute: idistitute[1] + ',' + idistitute[2],
      last_status_date: new Date(Date.now()),
      filed_date: new Date(this.tramiteActual.filed_date),
      IdNumber: this.validationForm.get('basicDataForm.numeroIdentificacion').value,
      AplicantName: aplicantname,
      name_profession: idprofesion[1]+ ',' + idprofesion[2],
      IdDocument_type: this.validationForm.get('basicDataForm.documentodescripcion').value,
    }

    await lastValueFrom(this.requestService.updateRequest(json));

    //actualizacion de documentos
    let documentos = this.validationForm.get('attachmentform.documentstate').value;

    let documentstoupdate: any[] = [];
    for (const element of documentos) {
      documentstoupdate.push({
        idDocumentTypeProcedureRequest: element.idDocumentTypeProcedureRequest,
        idDocumentType: element.idDocumentType,
        idProcedureRequest: element.idProcedureRequest,
        path: element.path,
        is_valid: element.is_valid,
        registration_date: element.registration_date,
      })
    }
    await lastValueFrom(this.documentsService.updateDocumentsByIdRequest(documentstoupdate));


    //guardado de seguimiento
    let motivosaclaracion: string = this.validationForm.get('validationstateform.checkBoxnameserror').value + '/' +
      this.validationForm.get('validationstateform.checkBoxprofessionerror').value + '/' +
      this.validationForm.get('validationstateform.checkBoxinstitutionerror').value + '/' +
      this.validationForm.get('validationstateform.checkBoxdocumenterror').value + '/' +
      this.validationForm.get('validationstateform.checkBoxdateerror').value;


    const tracking: any =
      {
        IdStatusTypes: selectedstatus,
        IdProcedureRequest: this.tramiteActual.id,
        IdUser: this.currentValidator.userId,
        observations: (this.validationForm.get('validationstateform.aditionalinfo').value!=" " ?
        this.validationForm.get('validationstateform.aditionalinfo').value+",": "")
           + this.validationForm.get('validationstateform.internalobservations').value,
        negation_causes: this.validationForm.get('validationstateform.negationcauses').value + "",
        other_negation_causes: this.validationForm.get('validationstateform.othernegationcauses').value + "",
        recurrent_argument: this.validationForm.get('validationstateform.recurrentargument').value + "",
        consideration: this.validationForm.get('validationstateform.considerations').value + "",
        exposed_merits: this.validationForm.get('validationstateform.merits').value + "",
        articles: this.validationForm.get('validationstateform.articles').value + "",
        additional_information: this.validationForm.get('validationstateform.aditionalinfo').value + "",
        clarification_types_motives: motivosaclaracion,
        paragraph_MA: this.validationForm.get('validationstateform.aclarationparagraph').value + "",
        paragraph_JMA1: this.validationForm.get('validationstateform.justificationparagraph1').value + "",
        paragraph_JMA2: this.validationForm.get('validationstateform.justificationparagraph2').value + "",
        paragraph_AMA: this.validationForm.get('validationstateform.aclarationparagrapharticle').value + "",
        dateTracking: new Date(Date.now())
      }

    await lastValueFrom(this.trackingService.addTracking(tracking));

    //guardado resolution bd
    if (this.validationForm.get('validationstateform.selectedstatus').value === '11') {

      this.popupAlert.infoAlert(`Generando Resolución, puede tardar unos momentos, espere por favor...`, 15000);
  console.log(status);
      if (status < 2) {
        const resolution: any =
          {
            idProcedureRequest: this.tramiteActual.id,
            date: new Date(Date.now()),
            idStatus: selectedstatus,
            path: this.tramiteActual.user.idUser + '/RESOLUCION_' + 'N°' + this.tramiteActual.filedNumber
          }
        await lastValueFrom(this.resolutiontService.addResolution(resolution));
      }

      let file: any = null;
      // @ts-ignore
      // @ts-ignore
      this.documentsService.getResolutionPdf(this.tramiteActual.id + "",
        estadosbd[status],
        this.Role + "",
        this.validationForm.get('validationstateform.aclarationparagraph').value + " ",
        this.validationForm.get('validationstateform.justificationparagraph1').value +
        this.validationForm.get('validationstateform.justificationparagraph2').value + " ",
        this.validationForm.get('validationstateform.aclarationparagrapharticle').value + " ",
        false
      ).pipe(
        switchMap(resp => {
          file = this.archiveService.base64ToFile(resp.data, "Resolucion.pdf");
          return this.archiveService.saveFileBlobStorage(file, 'RESOLUCION_' + 'N°' + this.tramiteActual.filedNumber, this.tramiteActual.user.idUser);
        })
      ).subscribe({
        next: value => {
          this.popupAlert.successAlert(`Solicitud Validada Exitosamente`, 4000);
          this.getHtmlBody(status, toNumber(this.validationForm.get('validationstateform.selectedstatus').value), file, aplicantname);
        }
      });

    } else {
      this.popupAlert.successAlert(`Solicitud Validada Exitosamente`, 4000);
      await this.getHtmlBody(selectedstatus, selectedstatus, null, aplicantname);
    }

  }

  public async getHtmlBody(status: number, selectedstatus: number, file: any, names: string): Promise<void> {

    let sendnotification = false;
    let senddocument = false;
    let tittle = '';
    let observacion = '';
    if (selectedstatus === 11) {
      sendnotification = true;
      senddocument = true;

      tittle = this.notificationtittle[status];

      status = status + 6;
    }
    if (selectedstatus === 7) {
      sendnotification = true;
      tittle = this.notificationtittle[status - 3];
      status = status + 3;
      observacion = this.validationForm.get('validationstateform.aditionalinfo').value;
    }
    if (selectedstatus === 8) {
      sendnotification = true;
      tittle = this.notificationtittle[status - 3];
      status = status + 3;

      observacion = this.validationForm.get('validationstateform.internalobservations').value;
    }
    localStorage.removeItem("procedure");
    if (sendnotification) {
      this.registerService.getFormats((status) + "").subscribe(resp => {
        const keys = ['~:~asunto~:~', '~:~nro_radicado~:~', '~:~nombres~:~', '~:~observacion~:~'];
        const dinamickeys = [tittle, this.tramiteActual.filedNumber, names, observacion];

        let nuevoHTML = resp.data.body;
        for (let index = 0; index < dinamickeys.length; index++) {
          nuevoHTML = nuevoHTML.replace(keys[index], dinamickeys[index]);
        }
        if (senddocument) {
          this.registerService.sendEmailAttachment({
            to: this.validationForm.get('basicDataForm.email').value.toString().toLowerCase(),
            subject: 'Notificación de ' + tittle + ' Tramite 19',
            body: nuevoHTML,
            attachment: file,
            AttachmentTitle: 'Resolucion_tramite_19.pdf'
          }).subscribe(() => {
            this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.ValidatorDashboard);
          });

        } else {
          this.registerService.sendEmail({
            to: this.validationForm.get('basicDataForm.email').value.toString().toLowerCase(),
            subject: 'Notificación de ' + tittle + ' Tramite 19',
            body: nuevoHTML
          }).subscribe(() => {
            this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.ValidatorDashboard);
          });
        }

      });
    } else {
      this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.ValidatorDashboard);
    }
  }

}
