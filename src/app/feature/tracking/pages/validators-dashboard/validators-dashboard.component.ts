import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CityService} from "../../../../core/services";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "../../../../core/enums";

@Component({
  selector: 'app-validators-dashboard',
  templateUrl: './validators-dashboard.component.html',
  styleUrls: ['./validators-dashboard.component.scss']
})
export class ValidatorsDashboardComponent implements OnInit{
  public validatorForm: FormGroup;
  tableFilter: any[] = [];

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
    public cityService: CityService,public fb: FormBuilder, private router: Router

  )
  {
    this.currentProgressAdvanceLine=50;
    this.stepAdvanceLine=2;
    this.validatorForm = this.fb.group({
      textToSearch: [''],
      pageSize: [10],
      pageNumber: [1],
    });


  }

  ngOnInit(): void {

    for (let i = 0; i < 8; i++) {
      this.tableFilter.push(
        {idsolicitud:i,ndoc:(120*i),nombre:"pepito"+i,
          tipo:"titulox",
          fecha:new Date("0"+(i+1)+"/02/2022"),
          estado:"en curso",tiempo:i+" dias restantes"
        }
      )
    }


  }

  public validar(id:any): void
  {

    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }

  public getdashboard(): void
  {

    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }



}
