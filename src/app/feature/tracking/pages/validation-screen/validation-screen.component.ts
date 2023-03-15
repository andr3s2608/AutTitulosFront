import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";

@Component({
  selector: 'app-validation-screen',
  templateUrl: './validation-screen.component.html',
  styleUrls: ['./validation-screen.component.scss']
})
export class ValidationScreenComponent extends AppBaseComponent implements  OnInit{

  public tramitNumber:any=1520;
  public statustext:any;

  public tramitdate:any;

  public validationform:any;

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
    this.validationform=this.fb.group({

      textfilter: [ '' ],

      basicDataForm:this.fb.group({

        tipoDocumento: [ '' , [ Validators.required ]],
        numeroIdentificacion: [ '' , [ Validators.required ]],
        primerNombre: [ '' , [ Validators.required ]],
        segundoNombre: [ '' ],
        primerApellido: [ '' , [ Validators.required ]],
        segundoApellido: [ '' ],
        email: [ '' , [ Validators.required, Validators.email ]],
        confirmarEmail: [ '' , [ Validators.required, Validators.email ]],
        telefonoFijo: [ '' , [ Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]],
        telefonoCelular: [ '' , [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]], fechaNacimiento: [ '' , [ Validators.required, super.dateValidator ]],
        sexo: [ '' , [ Validators.required ]],
        genero: [ '' , [ Validators.required ]],
        orientacionSexual: [ '' , [ Validators.required ]],
        etnia: [ '' , [ Validators.required ]],
        estadoCivil: [ '' , [ Validators.required ]],
        nivelEducativo: [ '' , [ Validators.required ]],



      }),
      requestDataForm: this.fb.group({
        titleTypeId: [ '', [ Validators.required ] ],
        instituteId: [ '', [ Validators.required ] ],
        professionId: [ '', [ Validators.required ] ],
        diplomaNumber: [ '', [ Validators.pattern("^[0-9]*$") ] ],
        graduationCertificate: [ '', [ ] ],
        endDate: [ '', [ Validators.required, super.dateValidator ] ],
        book: [ '', [ ] ],
        folio: [ '', [ ] ],
        yearTitle: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$") ] ],
        professionalCard: [],
        nameInternationalUniversity: [],
        countryId: [],
        numberResolutionConvalidation: [],
        dateResolutionConvalidation: [],
        entityId: []
      }),
      geographicDataForm: this.fb.group(
        {
          nacionalidad: [ '' , [ Validators.required ]],
          departamentoNacimiento: [ '' , [ Validators.required ]],
          ciudadNacimiento: ['', [ Validators.required ]],
          departamentoResidencia: [ '' , [ Validators.required ]],
          ciudadResidencia: [ '' , [ Validators.required ]]
        }
      ),
      validationstateform:this.fb.group({
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

  ngOnInit(): void {
  }



}
