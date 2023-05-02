import {Component, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-request-edit-observations',
  templateUrl: './request-edit-observations.component.html',
  styleUrls: ['./request-edit-observations.component.scss']
})
export class RequestEditObservationsComponent implements OnInit {

  /**
   * Formulario hijo de la informacion de observaciones la solicitud
   */
  public requestEditInfoForm: any;

  constructor(private controlContainer: ControlContainer) {
  }


  ngOnInit(): void {
    this.requestEditInfoForm = this.controlContainer.control;
    this.requestEditInfoForm = this.requestEditInfoForm.controls['editObservationsForm'];
  }


}
