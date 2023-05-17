import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import {RequestService} from "../../../../core/services/request.service";


@Component({
  selector: 'app-validators-dashboard',
  templateUrl: './validators-dashboard.component.html',
  styleUrls: ['./validators-dashboard.component.scss']
})
export class ValidatorsDashboardComponent implements OnInit {

  public validatorForm: FormGroup;

  tableFilter: any[] = [];

  public lastfilters: any = {
    finaldate: "",
    texttosearch: " ",
    selectedfilter: " ",
    pagenumber: "1",
    pagination: "15"
  }

  /**
   * Numero de solicitudes total
   */
  public paginator: string='';


  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;
  /**
   * Numero de solicitudes total
   */
  public total: number=0;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  constructor(public requestService: RequestService,
              public fb: FormBuilder,
              private router: Router
  ) {
    this.currentProgressAdvanceLine = 50;
    this.stepAdvanceLine = 2;
    this.validatorForm = this.fb.group({
      selector: [''],
      selectorrole: [localStorage.getItem('Role')],
      textfilter: [''],
      pageSize: [10],
      pageNumber: [1],
    });

  }

  ngOnInit(): void {

    localStorage.removeItem('source');
    let role: string = localStorage.getItem('Role');

    let date: Date = new Date(Date.now());

    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", {year: "numeric"});
    let month = date.toLocaleString("default", {month: "2-digit"});
    let day = date.toLocaleString("default", {day: "2-digit"});

    // Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;
    this.requestService.getDashboardValidation(
      formattedDate + "",
      "" + " ",
      "" + " ",
      "1",
      "15", role).subscribe(resp => {
      this.tableFilter = resp.data;
      this.total=resp.count;
      this.paginator=resp.message+" de "+this.total+ " Resultados";
    });
    this.lastfilters = {
      finaldate: formattedDate + "",
      texttosearch: "" + " ",
      selectedfilter: "" + " ",
      pagenumber: "1",
      pagination: "15"
    }
  }

  public validar(id: any): void {
    localStorage.setItem("procedure", id + "");
    localStorage.setItem("source","validation");
    this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.Validation)
  }
  public pasarpagina(): void {
  let pagina =  this.validatorForm.get('pageNumber').value;
    let role: string = localStorage.getItem('Role');

    this.requestService.getDashboardValidation(
      this.lastfilters.finaldate+"",
      this.lastfilters.texttosearch+"",
      this.lastfilters.selectedfilter+"",
      pagina+"",
      "15", role).subscribe(resp => {
      this.tableFilter = resp.data;
      if(pagina=="1")
      {
        this.total=resp.count;
      }
      this.paginator=resp.message+" de "+this.total+ " Resultados";

    });
  }



  public getdashboard(): void {
    let role: string = localStorage.getItem('Role');
    let selector = this.validatorForm.get('selector').value;
    let text = this.validatorForm.get('textfilter').value;

    this.validatorForm.get('pageNumber').setValue(1);

    let date: Date = new Date(Date.now());

    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", {year: "numeric"});
    let month = date.toLocaleString("default", {month: "2-digit"});
    let day = date.toLocaleString("default", {day: "2-digit"});

    // Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;
    this.requestService.getDashboardValidation(
      formattedDate + "",
      (text == null || text == "") ? " " : text,
      (selector == null || selector == "") ? " " : selector,
      "1",
      "15", role).subscribe(resp => {
      this.tableFilter = resp.data;
      this.total=resp.count;
      this.paginator=resp.message+" de "+this.total+ " Resultados";
    });

    this.lastfilters = {
      finaldate: formattedDate + "",
      texttosearch: (text == null || text == "") ? " " : text,
      selectedfilter: (selector == null || selector == "") ? " " : selector,
      pagenumber: "1",
      pagination: "15"
    }

  }


}
