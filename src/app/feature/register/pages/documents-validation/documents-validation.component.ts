import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../../core/services";
import {Router} from "@angular/router";
import {ROUTES} from "../../../../core/enums";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-documents-validation',
  templateUrl: './documents-validation.component.html',
  styleUrls: ['./documents-validation.component.scss']
})
export class DocumentsValidationComponent implements OnInit{

public variable : boolean=true;

  public form: FormGroup;
  public idTramit:any;
  public tramitName:any;
  public idNumber:any;
  public dateResolution:any;
  public numberResolution:any;
  public tramitStatus:any;
  public aditionalInfo:any;






  constructor(public cityService: CityService, private router: Router,public fb: FormBuilder){

    this.form = this.fb.group({
      codigo: [ '' , [ Validators.required ]]
    })
  }

  ngOnInit(): void {
  }

  public async Consultar():Promise<void>
  {
    if(this.form.valid)
    {
      ///se hace la busqueda
      this.idTramit=2;
      this.tramitName="prueba";
      this.idNumber=20;
      this.dateResolution="20/03/2020";
      this.numberResolution=34121;
      this.tramitStatus="Aprobado";
      this.aditionalInfo=" cumple"

      this.variable=false;
    }
    else {
      console.log("no ha ingresado ningun codigo")
    }



  }

  public volver()
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS);
  }

}
