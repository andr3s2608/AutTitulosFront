import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  /**
   * Centinela que habilita la tabla con las solicitudes
   */
  public showDashboard: boolean;

  /**
   * Centinela que habilita el formulario de aclaración
   */
  public showDisclaimerForm: boolean;

  /**
   * Lista de solicitudes realizadas por el ciudadano
   */
  public allByUser: any[] = [];

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * Formulario padre de la solicitud de aclaracion
   */
  public requestClarificationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stepAdvanceLine = 4;
    this.currentProgressAdvanceLine = 94;
    this.showDashboard = true;
    this.showDisclaimerForm = false;

    this.requestClarificationForm = this.fb.group({
      clarificationForm: this.fb.group({
        filedNumber: [],
        titleTypeId: [],
        reasonTypeId: [],
        fileSupport: [],
        observation: []
      })
    })

    this.allByUser.push(
      {
        filedNumber: "AUT2022REQUEST01",
        titleType: "Nacional",
        filedDate: Date.now(),
        institute: "Universidad 1",
        profession: "Tecnico 1",
        status: "Registo de usuario externo",
        colorTime: "#d1e7dd"
      }
      ,
      {
        filedNumber: "AUT2022REQUEST02",
        titleType: "Nacional",
        filedDate: Date.now(),
        institute: "Universidad 2",
        profession: "Tecnologo 2",
        status: "Aprobado por validador",
        colorTime: "#fff3cd"
      },
      {
        filedNumber: "AUT2022REQUEST03",
        titleType: "Nacional",
        filedDate: Date.now(),
        institute: "Universidad 3",
        profession: "Tecnologo 3",
        status: "Solicitar más información",
        colorTime: "#f8d7da"
      },
      {
        filedNumber: "AUT2022REQUEST04",
        titleType: "Nacional",
        filedDate: Date.now(),
        institute: "Universidad 4",
        profession: "Profesion 4",
        status: "Firmado por director",
        colorTime: "#D7F0F8"
      },
    )
  }

  ngOnInit(): void {

  }



}
