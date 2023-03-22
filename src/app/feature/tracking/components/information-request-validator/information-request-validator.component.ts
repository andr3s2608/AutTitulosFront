import {Component, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-information-request-validator',
  templateUrl: './information-request-validator.component.html',
  styleUrls: ['./information-request-validator.component.scss']
})
export class InformationRequestValidatorComponent implements OnInit {

  /**
   * Formulario hijo con la seccion del validador con informacion general de la solicitud
   */
  public informationRequestValidatorForm: any;


  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.informationRequestValidatorForm = this.controlContainer.control;
    this.informationRequestValidatorForm = this.informationRequestValidatorForm.controls['informationRequestValidatorForm'];
  }

}
