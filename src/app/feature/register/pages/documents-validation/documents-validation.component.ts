import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {ROUTES} from "@core-app/enums";
import {PopUpService, TrackingService} from "@core-app/services";


@Component({
  selector: 'app-documents-validation',
  templateUrl: './documents-validation.component.html',
  styleUrls: ['./documents-validation.component.scss']
})
export class DocumentsValidationComponent implements OnInit{

public variable : boolean=true;

  public form: FormGroup;

  /**
   * datos relacionados con el codigo de verificacion
   */
  public validationDocument:any;


  constructor(public trackingService: TrackingService,
              private router: Router,
              public fb: FormBuilder,
              private popupAlert: PopUpService){

    this.form = this.fb.group({
      codigo: [ '' , [ Validators.required ]]
    })
  }

  ngOnInit(): void {
  }

  public async Consultar():Promise<void> {
    if(this.form.valid) {
      this.trackingService.getValidationDocument(this.form.get('codigo').value).subscribe(resp => {

        if(resp.count>0)
        {
          this.validationDocument=resp.data
          this.variable=false;
        }
        else {
          this.popupAlert.errorAlert(
            resp.result.message,
            4000
          );

        }
      });
    }
    else {
      this.popupAlert.errorAlert(
       'No se ha ingresado un codigo para validar',
        4000
      );
    }
  }

  public volver() {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+'/'+ROUTES.DOCUMENTS_VALID);
    this.variable=true;
  }

}
