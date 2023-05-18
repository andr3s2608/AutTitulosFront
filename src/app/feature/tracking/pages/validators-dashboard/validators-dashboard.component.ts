import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import {RequestService} from "../../../../core/services/request.service";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-validators-dashboard',
  templateUrl: './validators-dashboard.component.html',
  styleUrls: ['./validators-dashboard.component.scss']
})
export class ValidatorsDashboardComponent implements OnInit {

  /**
   * Formulario para los filtros de busqueda
   */
  public validatorForm: FormGroup;

  /**
   * Lista con las solicitudes a mostrar en el dashboard
   */
  public tableFilter: any[] = [];

  /**
   * Atributo para paginador, items por página
   */
  public pageSizePaginator: number = 10;

  /**
   * Atributo para paginador, número de pagina actual
   */
  public pageNumberPaginator: number = 1;

  /**
   * Número total de solicitudes
   */
  public totalRequests: number = 0;

  /**
   * Filtros de busqueda
   */
  public lastfilters: any = {
    finaldate: "",
    texttosearch: " ",
    selectedfilter: " ",
    pagenumber: this.pageNumberPaginator,
    pagination: this.pageSizePaginator
  }

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

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
      pageSize: [this.pageSizePaginator],
      pageNumber: [this.pageNumberPaginator],
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
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`,
      role)
      .subscribe(resp => {
      this.tableFilter = resp.data;
      this.totalRequests = resp.count;
    });

    this.lastfilters = {
      finaldate: formattedDate + "",
      texttosearch: "" + " ",
      selectedfilter: "" + " ",
      pagenumber: `${this.pageNumberPaginator}`,
      pagination: `${this.pageSizePaginator}`
    }

  }

  public validar(id: any): void {
    localStorage.setItem("procedure", id + "");
    localStorage.setItem("source","validation");
    this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.Validation)
  }

  public getDashboard(): void {
    let role: string = localStorage.getItem('Role');
    let selector = this.validatorForm.get('selector').value;
    let text = this.validatorForm.get('textfilter').value;

    this.validatorForm.get('pageNumber').setValue(1);

    let date: Date = new Date(Date.now());

    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", {year: "numeric"});
    let month = date.toLocaleString("default", {month: "2-digit"});
    let day = date.toLocaleString("default", {day: "2-digit"});
    this.pageNumberPaginator = 1;

    // Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;
    this.requestService.getDashboardValidation(
      formattedDate + "",
      (text == null || text == "") ? " " : text,
      (selector == null || selector == "") ? " " : selector,
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`, role).subscribe(resp => {
      this.tableFilter = resp.data;
      this.totalRequests=resp.count;
    });

    this.lastfilters = {
      finaldate: formattedDate + "",
      texttosearch: (text == null || text == "") ? " " : text,
      selectedfilter: (selector == null || selector == "") ? " " : selector,
      pagenumber: `${this.pageNumberPaginator}`,
      pagination: `${this.pageSizePaginator}`
    }

  }

  /**
   * Cambia la página en la tabla
   * @param e Evento del paginador
   */
  public changePage(e: PageEvent): void {
    console.log(e);
    this.pageSizePaginator = e.pageSize;
    this.pageNumberPaginator = e.pageIndex + 1;

    let role: string = localStorage.getItem('Role');
    this.requestService.getDashboardValidation(
      this.lastfilters.finaldate+"",
      this.lastfilters.texttosearch+"",
      this.lastfilters.selectedfilter+"",
      `${this.pageNumberPaginator}`,
      `${this.pageSizePaginator}`,
      role).subscribe(resp => {
      console.log("estoy en resp", resp);
      this.tableFilter = resp.data;
      this.totalRequests = resp.count;

    });
  }


}
