import {Component, OnInit,Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ArchiveService, PopUpService} from "../../../../core/services";
import {Router} from "@angular/router";
import {ReportsService} from "../../../../core/services/reports.service";
import * as XLSX from 'xlsx';
import {ROUTES} from "../../../../core/enums";
import {PageEvent} from "@angular/material/paginator";
import { saveAs } from 'file-saver';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})

export class ReportPageComponent implements OnInit {

  /**
   * Formulario para los filtros de busqueda
   */
  public reportsform: FormGroup;

  /**
   * Lista con las solicitudes a mostrar en el dashboard
   */
  public tableFilter: any[] = [];

  /**
   * excel file extension
   */
  public EXCEL_EXTENSION = '.xlsx';

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
   * Numero de solicitudes total
   */
  public totalRequests: number=0;

  /**
   * Atributo para paginador, items por página
   */
  public pageSizePaginator: number = 10;

  /**
   * Atributo para paginador, número de pagina actual
   */
  public pageNumberPaginator: number = 1;

  /**
   * guarda el ultimo filtro seleccionado por parte del usuario
   */
  public lastfilters:any = {
    initialdate:" ",
    finaldate:"",
    texttosearch:" ",
    selectedfilter:" ",
    iduser:" ",
    pagenumber: this.pageNumberPaginator,
    pagination: this.pageSizePaginator
  }

  constructor(public fb: FormBuilder,
              public reportsService: ReportsService,
              private router: Router,
              private popupAlert: PopUpService,
              public archiveService: ArchiveService) {
    this.stepAdvanceLine = 3;
    this.currentProgressAdvanceLine = 75;
    this.urlIconExternalWindow = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
    this.reportsform = this.fb.group({
      begindate: [''],
      enddate: [''],
      selector: [''],
      textfilter: [''],
      pageSize: [this.pageSizePaginator],
      pageNumber: [this.pageNumberPaginator],

    });
  }

  ngOnInit(): void {

    localStorage.removeItem("source");
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
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`)
      .subscribe(resp => {
        this.tableFilter = resp.data;
        this.totalRequests=resp.count;
    });

    this.lastfilters = {
      initialdate:formattedDateinitial + "",
      finaldate:formattedDatefinal + "",
      texttosearch:" ",
      selectedfilter:" " ,
      iduser:" ",
      pagenumber: `${this.pageNumberPaginator}`,
      pagination: `${this.pageSizePaginator}`
    }
  }

  public getDashboard(): void {
    let dateinitial;
    let datefinal;
    let formattedDatefinal;
    let formattedDateinitial;
    if (this.reportsform.get('enddate').value != null && this.reportsform.get('enddate').value != "") {
      datefinal = this.reportsform.get('enddate').value;
      formattedDatefinal=datefinal;
      datefinal=new Date(datefinal);
    } else {
      datefinal = new Date(Date.now());

      // Get year, month, and day part from the date
      let yearfinal = datefinal.toLocaleString("default", {year: "numeric"});
      let monthfinal = datefinal.toLocaleString("default", {month: "2-digit"});
      let dayfinal = datefinal.toLocaleString("default", {day: "2-digit"});
      // Generate yyyy-mm-dd date string
      formattedDatefinal = yearfinal + "-" + monthfinal + "-" + dayfinal;

    }
    if (this.reportsform.get('begindate').value != null && this.reportsform.get('begindate').value != "") {
      dateinitial = this.reportsform.get('begindate').value;
      formattedDateinitial=dateinitial;
      dateinitial=new Date(dateinitial);

    } else {
      dateinitial = new Date(Date.now());
      //se toman los 30 dias iniciales
      dateinitial.setDate(datefinal.getDate() - 30);

      // Get year, month, and day part from the date
      let yearinitial = dateinitial.toLocaleString("default", {year: "numeric"});
      let monthinitial = dateinitial.toLocaleString("default", {month: "2-digit"});
      let dayinitial = dateinitial.toLocaleString("default", {day: "2-digit"});


      // Generate yyyy-mm-dd date string
      formattedDateinitial = yearinitial + "-" + monthinitial + "-" + dayinitial;
    }

      let text=this.reportsform.get('textfilter').value!="" ? this.reportsform.get('textfilter').value:" "
      this.reportsService.getReportsDashboard(
        formattedDateinitial + "",
        formattedDatefinal + "",
        text+"",
        " ",
        "" + " ",
        `${this.pageNumberPaginator}`,
        `${this.pageSizePaginator}`).subscribe(resp => {
        this.tableFilter = resp.data;
        this.totalRequests=resp.count;
      });

      this.lastfilters = {
        initialdate:formattedDateinitial + "",
        finaldate:formattedDatefinal + "",
        texttosearch:text,
        selectedfilter:" ",
        iduser:" ",
        pagenumber:`${this.pageNumberPaginator}`,
        pagination:`${this.pageSizePaginator}`
      }





    // this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }
  public descargarArchivo(): void {

    let dateinitial;
    let datefinal;
    let formattedDatefinal: string;
    let formattedDateinitial: string;
    if (this.reportsform.get('enddate').value != null && this.reportsform.get('enddate').value != "") {
      datefinal = this.reportsform.get('enddate').value;
      formattedDatefinal=datefinal;
      datefinal=new Date(datefinal);
    } else {
      datefinal = new Date(Date.now());

      // Get year, month, and day part from the date
      let yearfinal = datefinal.toLocaleString("default", {year: "numeric"});
      let monthfinal = datefinal.toLocaleString("default", {month: "2-digit"});
      let dayfinal = datefinal.toLocaleString("default", {day: "2-digit"});
      // Generate yyyy-mm-dd date string
      formattedDatefinal = yearfinal + "-" + monthfinal + "-" + dayfinal;

    }
    if (this.reportsform.get('begindate').value != null && this.reportsform.get('begindate').value != "") {
      dateinitial = this.reportsform.get('begindate').value;
      formattedDateinitial=dateinitial;
      dateinitial=new Date(dateinitial);

    } else {
      dateinitial = new Date(Date.now());
      //se toman los 30 dias iniciales
      dateinitial.setDate(datefinal.getDate() - 30);

      // Get year, month, and day part from the date
      let yearinitial = dateinitial.toLocaleString("default", {year: "numeric"});
      let monthinitial = dateinitial.toLocaleString("default", {month: "2-digit"});
      let dayinitial = dateinitial.toLocaleString("default", {day: "2-digit"});


      // Generate yyyy-mm-dd date string
      formattedDateinitial = yearinitial + "-" + monthinitial + "-" + dayinitial;
    }
    let months = (datefinal.getFullYear() - dateinitial.getFullYear()) * 12;
    months -= dateinitial.getMonth();
    months += datefinal.getMonth();


    this.popupAlert.infoAlert(
      'Generando documento,por favor espere',
      9000);
    let filter=this.reportsform.get('selector').value!="" ? this.reportsform.get('selector').value:" ";

    if(filter==='3030aprobado' ||filter==='3030aclarado')
    {
      this.reportsService.getReports3030(
        formattedDateinitial + "",
        formattedDatefinal + "",
        filter+"",
        `${this.pageNumberPaginator}`,
        (months+1)*5000+"").subscribe(resp => {
        const data = resp.data;
        let number=1;
        const datafinal:any=[];

        datafinal.push("1;"+formattedDateinitial+";"+formattedDatefinal+";DI;11001;"+(data.numeropersonas+data.numeroreportes))
        data.listapersonas.map((items:any) => {
          datafinal.push("2;" + number + ";" + items?.toString());
          number++;  // Incrementar number en cada iteración
        });
        data.listareporte.map((items:any) => {
          datafinal.push("3;" + number + ";" + items?.toString());
          number++;  // Incrementar number en cada iteración
        });

        this.convertArrayToTxt(datafinal,filter+"");

      });
    }
    else {
      this.reportsService.getReportsDashboard(
        formattedDateinitial + "",
        formattedDatefinal + "",
        " ",
        filter+"",
        "" + " ",
        `${this.pageNumberPaginator}`,
        (months+1)*5000+"").subscribe(resp => {
        const data = resp.data;
        const fileToExport = data.map((items:any) => {
          return {

            "Numero Id Trámite": items?.idfiled,
            "Fecha de Radicación Trámite": items?.fileddate,
            "Tipo de Título": items?.titletype,
            "Tipo de Documento": items?.iddoctype,
            "Número Documento de Identidad": items?.idnumber,
            "Nombres y Apellidos Solicitante": items?.aplicantname,
            "Profesión Descripción":items?.name_profession,
            "Institución Descripción":items?.name_institute,
            "No Resolución":items?.resolutiondate,
            "Fecha Resolución":items?.name_profession,
            "Eficiencia":"",
            "Estado de la Solicitud": items?.statusstring,
            "Rol":this.roles(items?.rol),
          }
        });

        this.download(fileToExport,this.reportsform.get('selector').value!="" ? this.reportsform.get('selector').value+"" :'Todos');


      });
    }

  }
  public convertArrayToTxt(element: any, fileName: string): void {
    const txtContent = element.join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName+'.txt');
  }

  public roles(id: any): string {
    let roles = [{
      rol:'Ciudadano',id:'31ab2d61-65b8-4c7d-a793-79cdba31b235'
    },{
      rol:'Validador',id:'fe3a0cef-1348-48fe-b8b8-b743d24f666a'
    },{
      rol:'Coordinador',id:'e181c33a-a648-4975-9404-bf6977f00f5c'
    },{
      rol:'Subdirector',id:'4ba79be3-d686-4e4d-959a-e14a9a081604'
    }]
    for (let i = 0; i <roles.length ; i++) {
      if(id==roles[i].id)
      {
        return roles[i].rol;
      }
    }
    return "";

  }







  /**
   * Cambia la página en la tabla
   * @param e Evento del paginador
   */
  public changePage(e: PageEvent): void {

    this.pageSizePaginator = e.pageSize;
    this.pageNumberPaginator = e.pageIndex + 1;

    this.reportsService.getReportsDashboard(
      this.lastfilters.initialdate + "",
      this.lastfilters.finaldate + "",
      this.lastfilters.texttosearch+"",
      " ",
      "" + " ",
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`).subscribe(resp => {
      this.tableFilter = resp.data;
      this.totalRequests=resp.count;
    });
  }

  public download(element: any, fileName: string): void {

    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, fileName+this.EXCEL_EXTENSION);

  }

  public validar(id: any): void {
    localStorage.setItem("procedure", id + "");
    localStorage.setItem("source","Reports");
    this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.Validation)
  }

}
