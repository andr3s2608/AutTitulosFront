import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CityService} from "../../../../core/services";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";
import {RequestService} from "../../../../core/services/request.service";

@Component({
  selector: 'app-validators-dashboard',
  templateUrl: './validators-dashboard.component.html',
  styleUrls: ['./validators-dashboard.component.scss']
})
export class ValidatorsDashboardComponent implements OnInit{
  public validatorForm: FormGroup;
  tableFilter: any[] = [];

  public lastfilters:any = {
    finaldate:"",
    texttosearch:" ",
    selectedfilter:" ",
    pagenumber:"1",
    pagination:"15"
  }

  lengthpages:number=0;


  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;
  constructor(
    public requestService: RequestService,public fb: FormBuilder, private router: Router

  )
  {
    this.currentProgressAdvanceLine=50;
    this.stepAdvanceLine=2;
    this.validatorForm = this.fb.group({
      selector: [''],
      textfilter: [''],
      pageSize: [10],
      pageNumber: [1],
    });


  }

  ngOnInit(): void {

    let date = new Date(Date.now());

// Get year, month, and day part from the date
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;
    this.requestService.getDashboardValidation(
      formattedDate+"",
      ""+" ",
      ""+" ",
      "1",
        "15","Funcionario").subscribe(resp => {
        this.tableFilter=resp.result.data;

    });
    this.lastfilters= {
      finaldate:formattedDate+"",
      texttosearch:""+" ",
      selectedfilter:""+" ",
      pagenumber:"1",
      pagination:"15"
    }
  }

  public validar(id:any): void
  {
    localStorage.setItem("procedure",id+"");
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }

  public getdashboard(): void
  {
      let selector=  this.validatorForm.get('selector').value;
      let text=  this.validatorForm.get('textfilter').value;


    let date = new Date(Date.now());

// Get year, month, and day part from the date
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;
    this.requestService.getDashboardValidation(
      formattedDate+"",
      (text==null || text=="") ? " ":text,
      (selector==null || selector=="") ? " ":selector,
      "1",
      "15","Funcionario").subscribe(resp => {
      this.tableFilter=resp.result.data;

    });
  this.lastfilters= {
    finaldate:formattedDate+"",
    texttosearch:(text==null || text=="") ? " ":text,
    selectedfilter:(selector==null || selector=="") ? " ":selector,
    pagenumber:"1",
    pagination:"15"
  }

  }



}
