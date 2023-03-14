import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, Validators} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {AppBaseComponent} from "../../../../core/utils";

import {Router} from "@angular/router";

@Component({
  selector: 'app-validation-states',
  templateUrl: './validation-states.component.html',
  styleUrls: ['./validation-states.component.scss']
})
export class ValidationStatesComponent extends AppBaseComponent implements OnInit{

  public tramitNumber:any=1520;
  public status:any;

  public validationstateform:any;


  public solicitudstates: any[] = [];

  constructor(public fb: FormBuilder,
              public cityService: CityService, private controlContainer: ControlContainer)
  {
    super();
    /*
    this.validationstateform=this.fb.group({
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
    })

     */
    this.solicitudstates.push({idestado:0,nombre:"Aprobado por parte del validador de documentos"})
    this.solicitudstates.push({idestado:1,nombre:"Negado por parte del validador de documentos"})
    this.solicitudstates.push({idestado:2,nombre:"Resuelve recurso de reposición de validación"})
    this.solicitudstates.push({idestado:3,nombre:"Solicitar Información"})
    this.solicitudstates.push({idestado:4,nombre:"Tramite-duplicado Anular"})
    this.solicitudstates.push({idestado:5,nombre:"Resuelve recurso de aclaración validación"})
  }
  ngOnInit(): void {
    this.validationstateform = this.controlContainer.control;
    this.validationstateform = this.validationstateform.controls['validationstateform'];
  }

  public statechange():void
  {

    console.log('holaaaa')
    console.log(this.validationstateform.get('selectedstatus').value)

    this.status=this.solicitudstates[this.validationstateform.get('selectedstatus').value].nombre;


  }

  getErrorMessage(field: string): string {
    let message;
    switch (field) {

      case 'selectedstatus':
        if ( this.validationstateform?.get(field).hasError('required') && this.isTouchedField(this.validationstateform, field)) {
          message = 'Es requerido';
        }
        break;

    }
    return message;
  }



}
