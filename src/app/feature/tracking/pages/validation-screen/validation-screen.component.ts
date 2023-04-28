import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArchiveService, CityService, PopUpService} from "../../../../core/services";
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
import {toBoolean} from "ng-zorro-antd/core/util";

/**
 * Component que permite validar la información de un trámite
 */
@Component({
  selector: 'app-validation-screen',
  templateUrl: './validation-screen.component.html',
  styleUrls: ['./validation-screen.component.scss']
})
export class ValidationScreenComponent extends AppBaseComponent implements  OnInit{

  /**
   * Representa el tramite actual a validar
   */
  public tramiteActual: ProcedureValidation;

  /**
   * ultimo seguimiento
   */
  public lasttracking: any;
  /**
   * lista de seguimiento
   */
  public tracking: any[]=[];
  /**
   * Representa el usuario tramite actual a validar
   */
  public user: UserValidation;

  /**
   * Representa el usuario tramite actual a validar
   */
  public show: boolean=false;


  /**
   * Formulario padre que agrega toda la validacion de una solicitud
   */
  public validationForm: FormGroup;


  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  constructor(public fb: FormBuilder,
              public cityService: CityService,
              public registerService: RegisterService,
              public trackingService: TrackingService,
              public documentsService: DocumentsService,
              public requestService: RequestService,
              public resolutiontService: ResolutionService,

              public archive :ArchiveService,
              private popupAlert: PopUpService,private router: Router)
  {
    super();
    let procedure=localStorage.getItem("procedure");
    this.requestService.getRequestbyid(procedure).subscribe(resp => {
      let datatramite= resp;

      this.registerService.getInfoUserByIdCodeVentanilla(datatramite.user_code_ventanilla).subscribe(resp2 => {

        let data= resp2.data;
        this.user={
          tipoDocumento: data.tipoIdentificacion ? data.tipoIdentificacion:2,
          numeroIdentificacion: data.numeroIdentificacion ? data.numeroIdentificacion:'',
          primerNombre: data.primerNombre ? data.primerNombre:'',
          segundoNombre: data.segundoNombre ? data.segundoNombre:'',
          primerApellido: data.primerApellido ? data.primerApellido:'',
          segundoApellido: data.segundoApellido ? data.segundoApellido:'',
          email: data.segundoApellido ? data.segundoApellido:'',
          fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento):new Date(null),
          telefonoFijo: data.telefonoFijo ? data.telefonoFijo:'',
          telefonoCelular: data.telefonoCelular ? data.telefonoCelular:'',
          sexo: data.sexo ? data.sexo:1,
          genero: data.genero ? data.genero:1,
          orientacionSexual: data.orientacionSexual ? data.orientacionSexual:1,
          etnia: data.etnia ? data.etnia:1,
          estadoCivil:data.estadoCivil ? data.estadoCivil:1,
          nivelEducativo: data.nivelEducativo ? data.nivelEducativo:1,
          nacionalidad: data.nacionalidad ? data.nacionalidad:170,
          departamentoNacimiento: data.nacionalidad ? data.nacionalidad:1,
          ciudadNacimiento: data.ciudadNacimiento ? data.ciudadNacimiento:1,
          departamentoResidencia: data.depaResi ? data.depaResi:3,
          ciudadResidencia: data.ciudadResiciudadResi ? data.ciudadNacimiento:149,
          idUser:datatramite.idUser+"",
          idUserVentanilla:datatramite.user_code_ventanilla
        }






        this.tramiteActual={
          id:datatramite.idProcedureRequest,
          user:this.user,
          statusId: datatramite.idStatus,
          status: datatramite.status,
          filedNumber: datatramite.filed_number,
          dateRequest: new Date(Date.now()),
          dateTracking:  new Date(Date.now()),
          titleTypeId: datatramite.idTitleTypes,
          instituteId: datatramite.idInstitute,
          diplomaNumber: datatramite.idProcedureRequest,
          graduationCertificate: datatramite.idProfessionInstitute,
          endDate: datatramite.end_date,
          book: datatramite.book ? datatramite.book :'',
          folio:datatramite.folio? datatramite.folio :'',
          yearTitle: datatramite.year_title,
          professionalCard: datatramite.professional_card,
          filed_date:datatramite.filed_date,
          name_institute:datatramite.name_institute,
          idnumber:datatramite.idNumber,
          aplicantnanme:datatramite.aplicantName
        }

        this.trackingService.getTrackingbyid(datatramite.idProcedureRequest).subscribe(resp3 => {
          this.tracking=resp3.result.data;

          if(resp3.result.count> 2)
          {

            this.lasttracking= this.tracking[this.tracking.length-1];
          }
          this.loadInfoTramiteActual();
          this.show=true;


        });



      });
    });








    this.currentProgressAdvanceLine=50;
    this.stepAdvanceLine=2;

  }

  ngOnInit(): void {}

  private loadInfoTramiteActual(): void {

    let checkbox:any;
    console.log(this.lasttracking+ "holaaa")
    if(this.lasttracking!=null)
    {
      console.log('entro2?')
      checkbox=this.lasttracking.clarification_types_motives.split('/')
    }

    this.validationForm = this.fb.group({

      informationRequestValidatorForm: this.fb.group({
        filedNumber: [ this.tramiteActual.filedNumber , [ Validators.required ]],
        titleType: [ 'NACIONAL' , [ Validators.required ]],
        status: [ this.tramiteActual.status , [ Validators.required ]],
        assignedUser: [ 'NombreFuncionario' , [ Validators.required ]],
        dateRequest: [ formatDate(new Date(this.tramiteActual.dateRequest), 'yyyy-MM-dd', 'en') , [ Validators.required ]]
      }),

      basicDataForm: this.fb.group({
        documentodescripcion: [ ''],
        tipoDocumento: [ this.tramiteActual.user.tipoDocumento , [ Validators.required ]],
        numeroIdentificacion: [ this.tramiteActual.user.numeroIdentificacion+"" , [ Validators.required ]],
        primerNombre: [ this.tramiteActual.user.primerNombre , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        segundoNombre: [ this.tramiteActual.user.segundoNombre, [Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        primerApellido: [ this.tramiteActual.user.primerApellido , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")]],
        segundoApellido: [ this.tramiteActual.user.segundoApellido,[Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$")] ],
        email: [this.tramiteActual.user.email , [ Validators.required, Validators.email, Validators.maxLength(50) ]],

        telefonoFijo: [ this.tramiteActual.user.telefonoFijo , [ Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]],
        telefonoCelular: [this.tramiteActual.user.telefonoCelular , [ Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$") ]],
        fechaNacimiento: [ formatDate(new Date(this.tramiteActual.user.fechaNacimiento), 'yyyy-MM-dd', 'en') , [ Validators.required, super.dateValidator ]],
        sexo: [ this.tramiteActual.user.sexo , [ Validators.required ]],
        genero: [ this.tramiteActual.user.genero , [ Validators.required ]],
        orientacionSexual: [ this.tramiteActual.user.orientacionSexual , [ Validators.required ]],
        etnia: [ this.tramiteActual.user.etnia , [ Validators.required ]],
        estadoCivil: [ this.tramiteActual.user.estadoCivil , [ Validators.required ]],
        nivelEducativo: [ this.tramiteActual.user.nivelEducativo , [ Validators.required ]],
      }),

      geographicDataForm: this.fb.group(
        {
          nacionalidad: [ this.tramiteActual.user.nacionalidad , [ Validators.required ]],
          departamentoResidencia: [ this.tramiteActual.user.departamentoResidencia , [ Validators.required ]],
          ciudadResidencia: [ this.tramiteActual.user.ciudadResidencia , [ Validators.required ]],
          departamentoNacimiento: [ this.tramiteActual.user.departamentoNacimiento , [ Validators.required ]],
          ciudadNacimiento: [this.tramiteActual.user.ciudadNacimiento, [ Validators.required ]],
        }
      ),
      attachmentform: this.fb.group(
        {
          documentstate: ['']
        }
      ),

      requestDataForm: this.fb.group({
        titleTypeId: [ this.tramiteActual.titleTypeId, [ Validators.required ] ],
        instituteId: [ this.tramiteActual.instituteId, [ Validators.required ] ],
        professionId: [ "", [ Validators.required ] ],
        diplomaNumber: [ this.tramiteActual.diplomaNumber, [ Validators.pattern("^[0-9]*$") ] ],
        graduationCertificate: [ this.tramiteActual.graduationCertificate, [ ] ],
        endDate: [ formatDate(new Date(this.tramiteActual.endDate), 'yyyy-MM-dd', 'en'), [ Validators.required, super.dateValidator ] ],
        book: [ this.tramiteActual.book, [ ] ],
        folio: [ this.tramiteActual.folio, [ ] ],
        yearTitle: [ this.tramiteActual.yearTitle, [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$") ] ],
        professionalCard: [this.tramiteActual.professionalCard]
      }),

      validationstateform: this.fb.group({
        selectedstatus: [1],
        status: [ 'Aprobacion' ],
        internalobservations: [ '' ],
        negationcauses: [ this.lasttracking!=null ? this.lasttracking.negation_causes : '' ],
        othernegationcauses: [ this.lasttracking!=null ? this.lasttracking.other_negation_causes : '' ],
        recurrentargument: [ this.lasttracking!=null ? this.lasttracking.recurrent_argument : '' ],
        considerations: [ this.lasttracking!=null ? this.lasttracking.consideration : '' ],
        merits: [ this.lasttracking!=null ? this.lasttracking.exposed_merits : '' ],
        articles: [ this.lasttracking!=null ? this.lasttracking.articles : 'Articulo Primero: /n Articulo Segundo:' ],
        aditionalinfo: [ this.lasttracking!=null ? this.lasttracking.additional_information : '' ],
        checkBoxnameserror: [ this.lasttracking!=null ? toBoolean(checkbox[0]) : false ],
        checkBoxprofessionerror: [this.lasttracking!=null ? toBoolean(checkbox[1]) : false ],
        checkBoxinstitutionerror: [this.lasttracking!=null ? toBoolean(checkbox[2]) :false],
        checkBoxdocumenterror: [this.lasttracking!=null ? toBoolean(checkbox[3]) : false ],
        checkBoxdateerror: [this.lasttracking!=null ? toBoolean(checkbox[4]) :false ],
        aclarationparagraph: [ this.lasttracking!=null ? this.lasttracking.paragraph_MA : '' ],
        justificationparagraph1: [ this.lasttracking!=null ? this.lasttracking.paragraph_JMA1 : '' ],
        justificationparagraph2: [ this.lasttracking!=null ? this.lasttracking.paragraph_JMA2 : '' ],
        aclarationparagrapharticle: [ this.lasttracking!=null ? this.lasttracking.paragraph_AMA : '' ] ,

      }),
    })

    this.validationForm.get('informationRequestValidatorForm').disable();


  }
  public async preliminar(): Promise<void>{

    const status= this.validationForm.get('validationstateform.status').value;
    let preliminarresolution=true;
  console.log(status)

    let statustogenerate="";
    const estados: Array<string> = ['Aprobado', 'Negado', 'aclaración', 'Reposición'];
    const ultimosestados: Array<string> = ['4', '5', '10', '6'];
    for (const element of estados) {
      if(status.includes(element))
      {
        statustogenerate=element;
      }
    }
    if(status.includes("Firmar"))
    {
      console.log('entro')
      let laststatus=this.tramiteActual.statusId+"";
      console.log(laststatus)
      for (let i = 0; i < ultimosestados.length  ; i++) {
        console.log(ultimosestados[i])
        if(laststatus.includes(ultimosestados[i]))
        {
          console.log('entro includes')
          statustogenerate=estados[i];
        }
      }
    }
    if(statustogenerate==="")
    {
      this.popupAlert.infoAlert(
        `Por favor, revise el estado que desea previzualizar.`,
        4000
      );
    }
    else
    {
      this.popupAlert.infoAlert(
        `Por favor espere mientras se genera el documento`,
        10000
      );

      this.documentsService.getResolutionPdf(this.tramiteActual.id+"",
      statustogenerate,
      "Subdirector",
        this.validationForm.get('validationstateform.aclarationparagraph').value+" ",
        this.validationForm.get('validationstateform.justificationparagraph1').value+
              this.validationForm.get('validationstateform.justificationparagraph2').value+" ",
        this.validationForm.get('validationstateform.aclarationparagrapharticle').value+" ",
        preliminarresolution
    ).subscribe(resp => {

      let fileObtenido=resp.result.data;
      const byteArray = new Uint8Array(atob(fileObtenido).split('').map((char) => char.charCodeAt(0)));
      const file = new Blob([byteArray], {type: 'application/pdf'});
      let datalocalURL = URL.createObjectURL(file);
      window.open(datalocalURL, '_blank');

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
    else {


      const aplicantname=this.validationForm.get('basicDataForm.primerNombre').value.toString().toUpperCase()+" "+
        (this.validationForm.get('basicDataForm.segundoNombre').value!=null ?this.validationForm.get('basicDataForm.segundoNombre').value.toString().toUpperCase() : "" )+" "+
        this.validationForm.get('basicDataForm.primerApellido').value.toString().toUpperCase()+" "+
        (this.validationForm.get('basicDataForm.segundoApellido').value!=null ?this.validationForm.get('basicDataForm.segundoApellido').value.toString().toUpperCase() : "" )+" ";

      const idistitute= (this.validationForm.get('requestDataForm.instituteId').value+"").split(",");
      const idprofesion= (this.validationForm.get('requestDataForm.professionId').value+"").split(",");


      const json:any ={
        IdProcedureRequest:this.tramiteActual.id,
        IdTitleTypes:this.validationForm.get('requestDataForm.titleTypeId').value,
        IdStatus_types:this.validationForm.get('validationstateform.selectedstatus').value,
        IdInstitute:idistitute[0],
        IdProfessionInstitute:idprofesion[0],
        IdUser:this.tramiteActual.user.idUser,
        user_code_ventanilla:this.tramiteActual.user.idUserVentanilla,
        filed_number:this.tramiteActual.filedNumber,
        //IdProfession:this.validationForm.get('requestDataForm.professionId').value,
        diploma_number:this.validationForm.get('requestDataForm.diplomaNumber').value,
        graduation_certificate:this.validationForm.get('requestDataForm.graduationCertificate').value,
        end_date:this.validationForm.get('requestDataForm.endDate').value,
        book:this.validationForm.get('requestDataForm.book').value,
        folio:this.validationForm.get('requestDataForm.folio').value,
        year_title:this.validationForm.get('requestDataForm.yearTitle').value,
        professional_card:this.validationForm.get('requestDataForm.professionalCard').value,
        IdCountry:1,
        number_resolution_convalidation:"",
        date_resolution_convalidation:new Date(Date.now()),
        IdEntity:1,
        name_institute:idistitute[1],
        last_status_date:new Date(Date.now()),
        filed_date:new Date(this.tramiteActual.filed_date),
        IdNumber:this.validationForm.get('basicDataForm.numeroIdentificacion').value,
        AplicantName:aplicantname,
        name_profession:idprofesion[1],
        IdDocument_type:this.validationForm.get('basicDataForm.documentodescripcion').value,
      }

      this.requestService.updateRequest(json).subscribe(resp => {
      });

      //actualizacion de documentos
      let documentos=this.validationForm.get('attachmentform.documentstate').value;

      let documentstoupdate:any[]=[];
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
      this.documentsService.updateDocumentsByIdRequest(documentstoupdate).subscribe(resp => {
      });








      //guardado de seguimiento
      let motivosaclaracion:string=this.validationForm.get('validationstateform.checkBoxnameserror').value+'/'+
        this.validationForm.get('validationstateform.checkBoxprofessionerror').value+'/'+
        this.validationForm.get('validationstateform.checkBoxinstitutionerror').value+'/'+
        this.validationForm.get('validationstateform.checkBoxdocumenterror').value+'/'+
        this.validationForm.get('validationstateform.checkBoxdateerror').value;


      const tracking :any =
        {
          IdStatusTypes: this.validationForm.get('validationstateform.selectedstatus').value,
          IdProcedureRequest: this.tramiteActual.id,
          IdUser: 'andres',
          observations: this.validationForm.get('validationstateform.internalobservations').value,
          negation_causes: this.validationForm.get('validationstateform.negationcauses').value,
          other_negation_causes: this.validationForm.get('validationstateform.othernegationcauses').value,
          recurrent_argument: this.validationForm.get('validationstateform.recurrentargument').value,
          consideration:this.validationForm.get('validationstateform.considerations').value,
          exposed_merits: this.validationForm.get('validationstateform.merits').value,
          articles: this.validationForm.get('validationstateform.articles').value,
          additional_information: this.validationForm.get('validationstateform.aditionalinfo').value,
          clarification_types_motives: motivosaclaracion,
          paragraph_MA: this.validationForm.get('validationstateform.aclarationparagraph').value,
          paragraph_JMA1: this.validationForm.get('validationstateform.justificationparagraph1').value,
          paragraph_JMA2:this.validationForm.get('validationstateform.justificationparagraph2').value,
          paragraph_AMA: this.validationForm.get('validationstateform.aclarationparagrapharticle').value,
          dateTracking:new Date(Date.now())
        }

      this.trackingService.addTracking(tracking).subscribe(resp => {
      });

      //guardado resolution bd
      if(this.validationForm.get('validationstateform.selectedstatus').value==='11' )
      {

          this.popupAlert.infoAlert(
            `Generando Resolucion`,
            11000
          );
        const ultimosestados: Array<string> = ['4', '5', '10', '6'];
        for (const element of ultimosestados) {
          if((this.tramiteActual.statusId+'').includes(element))
          {
            const resolution:any =
              {
                idProcedureRequest: this.tramiteActual.id,
                date: new Date(Date.now()),
                path: "prueba"
              }

            this.resolutiontService.addResolution(resolution).subscribe(resp => {
            });

            this.documentsService.getResolutionPdf(this.tramiteActual.id+"",
              this.tramiteActual.statusId===4 ? "Aprobacion": "Negacion",
              "Subdirector",
              " ",
              " ",
              " ",
              false
            ).subscribe(resp => {


              const urlToFile = async (url: string, filename: string, mimeType: any) => {
                const res = await fetch(url);
                const buf = await res.arrayBuffer();
                return new File([buf], filename, { type: mimeType });
              };

              (async () => {
                const file = await urlToFile('data:application/pdf;base64,' + resp.result.data, 'resolucion', 'application/pdf');

                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                  'nameFile',
                  'RESOLUCION_' + 'N°' + this.tramiteActual.filedNumber
                );
                formData.append('containerName', "aguahumanos");
                formData.append('oid', this.tramiteActual.user.idUser);

                this.documentsService.uploadFiles(formData).subscribe(resp => {
                  this.popupAlert.successAlert(
                    `Solicitud Validada Exitosamente`,
                    4000
                  );
                  this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.ValidatorDashboard)

                  console.log(resp);
                });

              })();

            });
            break;
          }
        }

      }
      else
      {
        this.popupAlert.successAlert(
          `Solicitud Validada Exitosamente`,
          4000
        );
        this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.ValidatorDashboard)

      }



    }





  }


}
