import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";
import {ProcedureValidation} from "../../../../core/models";
import {formatDate} from "@angular/common";

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
              public cityService: CityService)
  {
    super();
    this.currentProgressAdvanceLine=50;
    this.stepAdvanceLine=2;
  }

  ngOnInit(): void {
    let objetoPrueba;
    objetoPrueba = {
      id: 999,
      user: {
        tipoDocumento: 2,
        numeroIdentificacion: '12345a',
        primerNombre: 'Nombre',
        segundoNombre: 'pruebaNombre',
        primerApellido: 'Apellido',
        segundoApellido: 'pruebaApellido',
        email: 'correo@gmail.com',
        fechaNacimiento: new Date(Date.now()),
        telefonoFijo: '1234567',
        telefonoCelular: '1234567890',
        sexo: 1,
        genero: 1,
        orientacionSexual: 1,
        etnia: 1,
        estadoCivil: 1,
        nivelEducativo: 1,
        nacionalidad: 170,
        departamentoNacimiento: 1,
        ciudadNacimiento: 1,
        departamentoResidencia: 3,
        ciudadResidencia: 149
      },
      statusId: 1,
      status: 'Registro por usuario externo',
      filedNumber: 'AUT2022REQUEST01',
      dateRequest: new Date(Date.now()),
      dateTracking:  new Date(Date.now()),
      titleTypeId: 1,
      instituteId: 1,
      professionId: 1,
      diplomaNumber: 2222,
      graduationCertificate: 'acta_grado1',
      endDate:  new Date(Date.now()),
      book: 'libro1',
      folio: 'folio1',
      yearTitle: 2022,
      professionalCard: 'tarjeta_profesional_1'
    }

    this.tramiteActual = objetoPrueba;

    this.loadInfoTramiteActual();
  }

  private loadInfoTramiteActual(): void {
    this.validationForm = this.fb.group({

      textfilter: [ '' ],


      basicDataForm:this.fb.group({
        tipoDocumento: [ this.tramiteActual.user.tipoDocumento , [ Validators.required ]],
        numeroIdentificacion: [ this.tramiteActual.user.numeroIdentificacion , [ Validators.required ]],
        primerNombre: [ this.tramiteActual.user.primerNombre , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
        segundoNombre: [ this.tramiteActual.user.segundoNombre, [Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
        primerApellido: [ this.tramiteActual.user.primerApellido , [ Validators.required ,Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")]],
        segundoApellido: [ this.tramiteActual.user.segundoApellido,[Validators.minLength(1), Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑ \-\']$")] ],
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
        selectedstatus: [ '' ],
        negationcauses: [ '' ],
        othernegationcauses: [ '' ],
        recurrentargument: [ '' ],
        considerations: [ '' ],
        merits: [ '' ],
        articles: [ 'Articulo Primero: /n Articulo Segundo:' ],
        aditionalinfo: [ '' ],
        checkBoxnameserror: [  ],
        checkBoxprofessionerror: [  ],
        checkBoxinstitutionerror: [],
        checkBoxdocumenterror: [  ],
        checkBoxdateerror: [ ],
        aclarationparagraph: [ '' ],
        justificationparagraph1: [ '' ],
        justificationparagraph2: [ '' ],
        aclarationparagrapharticle: [ '' ] ,
        internalobservations: [ '' ],
      }),
    })


  }


}
