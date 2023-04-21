import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {Router} from "@angular/router";
import {ReportsService} from "../../../../core/services/reports.service";

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
  /**
   * guarda el ultimo filtro seleccionado por parte del usuario
   */
  public lastfilters:any = {
    initialdate:" ",
    finaldate:"",
    texttosearch:" ",
    selectedfilter:" ",
    iduser:" ",
    pagenumber:"1",
    pagination:"15"
  }


  constructor(public fb: FormBuilder,
              public reportsService: ReportsService, private router: Router) {
    this.stepAdvanceLine = 3;
    this.currentProgressAdvanceLine = 75;
    this.urlIconActualWindow = 'https://cdn-icons-png.flaticon.com/512/2889/2889358.png';
    this.urlIconExternalWindow = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
    this.reportsform = this.fb.group({
      begindate: [''],
      enddate: [''],
      selector: [''],
      textfilter: [''],


    });
  }

  ngOnInit(): void {

    let datefinal = new Date(Date.now());

    // Get year, month, and day part from the date
    let yearfinal = datefinal.toLocaleString("default", {year: "numeric"});
    let monthfinal = datefinal.toLocaleString("default", {month: "2-digit"});
    let dayfinal = datefinal.toLocaleString("default", {day: "2-digit"});
    // Generate yyyy-mm-dd date string
    let formattedDatefinal = yearfinal + "-" + monthfinal + "-" + dayfinal;


    //se toman los 30 dias iniciales
    let dateinitial = new Date(Date.now());
    dateinitial.setDate(dateinitial.getDate() - 30);

    // Get year, month, and day part from the date
    let yearinitial = dateinitial.toLocaleString("default", {year: "numeric"});
    let monthinitial = dateinitial.toLocaleString("default", {month: "2-digit"});
    let dayinitial = dateinitial.toLocaleString("default", {day: "2-digit"});
    // Generate yyyy-mm-dd date string
    let formattedDateinitial = yearinitial + "-" + monthinitial + "-" + dayinitial;


    this.reportsService.getReportsDashboard(
      formattedDateinitial + "",
      formattedDatefinal + "",
      "" + " ",
      "" + " ",
      "" + " ",
      "1",
      "15").subscribe(resp => {
      this.tableFilter = resp.result.data;

    });
    this.lastfilters = {
      initialdate:formattedDateinitial + "",
      finaldate:formattedDatefinal + "",
      texttosearch:" ",
      selectedfilter:" " ,
      iduser:" ",
      pagenumber:"1",
      pagination:"15"
    }
  }

  public getDashboard(type: string): void {
    let dateinitial;
    let datefinal;
    if (this.reportsform.get('begindate').value != null && this.reportsform.get('begindate').value != "") {
      dateinitial = this.reportsform.get('begindate').value;

    } else {
      dateinitial = new Date(Date.now());
      //se toman los 30 dias iniciales
      dateinitial.setDate(dateinitial.getDate() - 30);
    }
    if (this.reportsform.get('enddate').value != null && this.reportsform.get('enddate').value != "") {
      datefinal = this.reportsform.get('enddate').value;

    } else {
    datefinal = new Date(Date.now());
    }


    // Get year, month, and day part from the date
    let yearfinal = datefinal.toLocaleString("default", {year: "numeric"});
    let monthfinal = datefinal.toLocaleString("default", {month: "2-digit"});
    let dayfinal = datefinal.toLocaleString("default", {day: "2-digit"});
    // Generate yyyy-mm-dd date string
    let formattedDatefinal = yearfinal + "-" + monthfinal + "-" + dayfinal;





    // Get year, month, and day part from the date
    let yearinitial = dateinitial.toLocaleString("default", {year: "numeric"});
    let monthinitial = dateinitial.toLocaleString("default", {month: "2-digit"});
    let dayinitial = dateinitial.toLocaleString("default", {day: "2-digit"});
    // Generate yyyy-mm-dd date string
    let formattedDateinitial = yearinitial + "-" + monthinitial + "-" + dayinitial;




    if (type === 'filtro') {
      this.reportsService.getReportsDashboard(
        formattedDateinitial + "",
        formattedDatefinal + "",
        "" + " ",
        this.reportsform.get('selector').value!="" ? this.reportsform.get('selector').value:" " ,
        "" + " ",
        "1",
        "15").subscribe(resp => {
        this.tableFilter = resp.result.data;
      });
      this.lastfilters = {
        initialdate:formattedDateinitial + "",
        finaldate:formattedDatefinal + "",
        texttosearch:" ",
        selectedfilter:this.reportsform.get('selector').value!="" ? this.reportsform.get('selector').value:" " ,
        iduser:" ",
        pagenumber:"1",
        pagination:"15"
      }
      this.reportsform.get('textfilter').setValue("");
    }
    else {
      this.reportsService.getReportsDashboard(
        formattedDateinitial + "",
        formattedDatefinal + "",
        this.reportsform.get('textfilter').value!="" ? this.reportsform.get('textfilter').value:" ",
        this.lastfilters.texttosearch+"",
        "" + " ",
        "1",
        "15").subscribe(resp => {
        this.tableFilter = resp.result.data;

      });
      this.lastfilters = {
        initialdate:formattedDateinitial + "",
        finaldate:formattedDatefinal + "",
        tttosearch:+"",
        iduser:" ",exttosearch:this.reportsform.get('textfilter').value!="" ? this.reportsform.get('textfilter').value:" ",
        selectedfilter:this.lastfilters.tex,
        pagenumber:"1",
        pagination:"15"
      }
      //prueba subida archivo
    }



    // this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }

  public validar(id: any): void {


    // this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }

}
