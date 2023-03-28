import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  public reportsform: FormGroup;

  tableFilter: any[] = [];

  /**
   * Icono de previsualizacion en la misma pantalla
   */
  public urlIconActualWindow: string;

  /**
   * Icono de previsualizacion en otra pestaña
   */
  public urlIconExternalWindow: string;

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;


  constructor(public fb: FormBuilder,
              public cityService: CityService, private router: Router) {
    this.stepAdvanceLine = 3;
    this.currentProgressAdvanceLine = 75;
    this.urlIconActualWindow = 'https://cdn-icons-png.flaticon.com/512/2889/2889358.png';
    this.urlIconExternalWindow = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
    this.reportsform = this.fb.group({
      begindate: [''],
      enddate: [''],


    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.tableFilter.push(
        {
          idsolicitud: i, ndoc: (120 * i), nombre: "pepito" + i,
          tipo: "titulox",
          fecha: new Date("0" + (i + 1) + "/02/2022"),
          estado: "en curso", tiempo: i + " dias restantes"
        }
      )
    }

  }

  public validar(id: any): void {

    // this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }


}
