import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityService} from "../../../../core/services";
import {ROUTES} from "../../../../core/enums";
import {Router} from "@angular/router";

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  public reportsform: FormGroup;

  tableFilter: any[] = [];



  constructor(public fb: FormBuilder,
              public cityService: CityService, private router: Router)
  {
    this.reportsform = this.fb.group({
      begindate: [''],
      enddate: [''],


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

   // this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.Validation)

  }


}
