import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService, PopUpService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";
import {ProcedureValidation, UserValidation} from "../../../../core/models";
import {formatDate} from "@angular/common";
import {RegisterService} from "../../../../core/services/register.service";

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
  public prueba: any;
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
              public cityService: CityService,public registerService: RegisterService,
              private popupAlert: PopUpService)
  {
    super();
    this.registerService.getRequestbyid("1").subscribe(resp => {
      let datatramite= resp.result.data;

      this.registerService.getInfoUserByIdCodeVentanilla("1922").subscribe(resp2 => {

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
          statusId: datatramite.idStatus_types,
          status: datatramite.idStatusTypeprocNavigation.description,
          filedNumber: datatramite.filed_number,
          dateRequest: new Date(Date.now()),
          dateTracking:  new Date(Date.now()),
          titleTypeId: datatramite.idTitleTypes,
          instituteId: datatramite.idInstitute,
          professionId: datatramite.idProfessionInstitute,
          diplomaNumber: datatramite.idProcedureRequest,
          graduationCertificate: datatramite.idProfessionInstitute,
          endDate: datatramite.end_date,
          book: datatramite.book ? datatramite.book :'',
          folio:datatramite.folio? datatramite.folio :'',
          yearTitle: datatramite.year_title,
          professionalCard: datatramite.professional_card
        }

        this.loadInfoTramiteActual();
        this.show=true;

      });
    });





    this.currentProgressAdvanceLine=50;
    this.stepAdvanceLine=2;

  }

  ngOnInit(): void {}

  private loadInfoTramiteActual(): void {
    this.validationForm = this.fb.group({

      informationRequestValidatorForm: this.fb.group({
        filedNumber: [ this.tramiteActual.filedNumber , [ Validators.required ]],
        titleType: [ 'NACIONAL' , [ Validators.required ]],
        status: [ this.tramiteActual.status , [ Validators.required ]],
        assignedUser: [ 'NombreFuncionario' , [ Validators.required ]],
        dateRequest: [ formatDate(new Date(this.tramiteActual.dateRequest), 'yyyy-MM-dd', 'en') , [ Validators.required ]]
      }),

      basicDataForm: this.fb.group({
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
        professionId: [ this.tramiteActual.professionId, [ Validators.required ] ],
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
        internalobservations: [ '' ],
        negationcauses: [ '' ],
        othernegationcauses: [ '' ],
        recurrentargument: [ '' ],
        considerations: [ '' ],
        merits: [ '' ],
        articles: [ 'Articulo Primero: /n Articulo Segundo:' ],
        aditionalinfo: [ '' ],
        checkBoxnameserror: [ false ],
        checkBoxprofessionerror: [ false ],
        checkBoxinstitutionerror: [false],
        checkBoxdocumenterror: [ false ],
        checkBoxdateerror: [false ],
        aclarationparagraph: [ '' ],
        justificationparagraph1: [ '' ],
        justificationparagraph2: [ '' ],
        aclarationparagrapharticle: [ '' ] ,

      }),
    })

    this.validationForm.get('informationRequestValidatorForm').disable();


  }


  public async saveRequest(): Promise<void> {

    const formData = this.validationForm.value;


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


      const json:any ={
        IdProcedureRequest:this.tramiteActual.id,
        IdTitleTypes:this.validationForm.get('requestDataForm.titleTypeId').value,
       IdStatus_types:this.validationForm.get('validationstateform.selectedstatus').value,
        IdInstitute:this.validationForm.get('requestDataForm.instituteId').value,
        IdProfessionInstitute:this.validationForm.get('requestDataForm.professionId').value,
        IdUser:this.tramiteActual.user.idUser,
        user_code_ventanilla:this.tramiteActual.user.idUserVentanilla,
        filed_number:this.tramiteActual.filedNumber,
        IdProfession:this.validationForm.get('requestDataForm.professionId').value,
        diploma_number:this.validationForm.get('requestDataForm.diplomaNumber').value,
        graduation_certificate:this.validationForm.get('requestDataForm.graduationCertificate').value,
        end_date:this.validationForm.get('requestDataForm.endDate').value,
        book:this.validationForm.get('requestDataForm.book').value,
        folio:this.validationForm.get('requestDataForm.folio').value,
        year_title:this.validationForm.get('requestDataForm.yearTitle').value,
        professional_card:this.validationForm.get('requestDataForm.professionalCard').value,
        name_international_university:"",
        IdCountry:1,
        number_resolution_convalidation:"",
        date_resolution_convalidation:new Date(Date.now()),
        IdEntity:1,
        name_institute_international:"",
      }

      this.registerService.updateRequest(json).subscribe(resp => {
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
      this.registerService.updateDocumentsbyid(documentstoupdate).subscribe(resp => {
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
          paragraph_AMA: this.validationForm.get('validationstateform.aclarationparagrapharticle').value
        }

      this.registerService.addTracking(tracking).subscribe(resp => {
      });



    }





  }


}
