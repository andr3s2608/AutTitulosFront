import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CityService} from "../../../../app/core/services";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-validators-dashboard',
  templateUrl: './validators-dashboard.component.html',
  styleUrls: ['./validators-dashboard.component.scss']
})
export class ValidatorsDashboardComponent implements OnInit{
  public validatorForm: FormGroup;
  tableFilter: any[] = [];

  lengthpages:number=0;
  constructor(
    public cityService: CityService,public fb: FormBuilder

  )
  {
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
    console.log("valido fila:"+id)
  }


}
