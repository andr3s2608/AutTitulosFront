import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, Validators} from "@angular/forms";

import {CityService} from "@core-app/services";
import {AppBaseComponent} from "@core-app/utils";

@Component({
  selector: 'app-geographic-data',
  templateUrl: './geopraphic-data.component.html',
  styleUrls: ['./geographic-data.component.scss']
})
export class GeographicDataComponent extends AppBaseComponent implements  OnInit{

  @Input() source: string;

  /**
   * Formulario hijo para los datos geograficos
   */
  public geographicDataForm:any;

  /**
   * Lista de paises
   */
  public countries: any[];

  /**
   * Lista de departamentos
   */
  public departaments: any[];

  /**
   * Lista de municipios de nacimiento
   */
  public municipalitiesNacimiento: any[];

  /**
   * Lista de municipios de residencia
   */
  public municipalitiesResidencia: any[];

  /**
   * Lista de municipios de residencia
   */
  public foreign:boolean=false;


  constructor(public fb: FormBuilder,
              public cityService: CityService, private controlContainer: ControlContainer)
  {
    super();
  }

  ngOnInit(): void {

    this.geographicDataForm = this.controlContainer.control;
    this.geographicDataForm = this.geographicDataForm.controls['geographicDataForm'];
    this.cityService.getCountries().subscribe(paises => this.countries = paises.data);
    this.cityService.getDepartaments().subscribe(
      departamentos => this.departaments = departamentos.data)
    if(this.geographicDataForm.get('departamentoResidencia').value != null && this.geographicDataForm.get('departamentoResidencia').value !="") {
      this.cityService.getMunByDepaId(this.geographicDataForm.get('departamentoResidencia').value).subscribe(resp => {
        this.municipalitiesResidencia = resp.data;
      });
    }
    if(this.geographicDataForm.get('departamentoNacimiento').value != null && this.geographicDataForm.get('departamentoNacimiento').value !="") {
      this.cityService.getMunByDepaId(this.geographicDataForm.get('departamentoNacimiento').value).subscribe(resp => {
        this.municipalitiesNacimiento = resp.data;
      });
    }
  }

  /**
   * cambia nacionalidad
   * @param idpais Id del pais
   */
  public changepais(idpais:any): void {
      if(idpais==170)
      {

        this.geographicDataForm.controls["departamentoNacimiento"].setValidators(
          [Validators.required]);
        this.geographicDataForm.controls["departamentoNacimiento"].updateValueAndValidity();
        this.geographicDataForm.controls["ciudadNacimiento"].setValidators(
          [Validators.required]);
        this.geographicDataForm.controls["ciudadNacimiento"].updateValueAndValidity();
        this.geographicDataForm.controls["ciudadnacimientootro"].setValidators([]);
        this.geographicDataForm.controls["ciudadnacimientootro"].updateValueAndValidity();
        this.foreign=false;
      }
      else {

        this.geographicDataForm.controls["departamentoNacimiento"].setValidators([]);
        this.geographicDataForm.controls["departamentoNacimiento"].updateValueAndValidity();
        this.geographicDataForm.controls["ciudadNacimiento"].setValidators([]);
        this.geographicDataForm.controls["ciudadNacimiento"].updateValueAndValidity();
        this.geographicDataForm.controls["ciudadnacimientootro"].setValidators(
          [Validators.required]);
        this.geographicDataForm.controls["ciudadnacimientootro"].updateValueAndValidity();
        this.foreign=true;
      }
  }

  /**
   * Actualiza la lista de municipios de residencia dependiendo del departamento
   * @param idDep Id del departamento
   */
  public getMunicipiosNacimiento(idDep: number): void {
    this.cityService
      .getMunByDepaId(idDep)
      .subscribe((resp) => (this.municipalitiesNacimiento = resp.data));
  }

  /**
   * Actualiza la lista de municipios de residencia dependiendo del departamento
   * @param idDep Id del departamento
   */
  public getMunicipiosResidencia(idDep: number): void {
    this.cityService
      .getMunByDepaId(idDep)
      .subscribe((resp) => (this.municipalitiesResidencia = resp.data));
  }

  /**
   * Devuelve un mensaje de validacion de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */



  public getErrorMessage(field: string): string {

    if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
      return 'Es requerido';
    }
    else {
      return '';
    }


  }

  /*
  public getErrorMessage(field: string): string {
    let message;
    switch (field) {

      case 'nacionalidad':
        if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'departamentoResidencia':
        if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'ciudadResidencia':
        if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'departamentoNacimiento':
        if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
          message = 'Es requerido';
        }
        break;
      case 'ciudadNacimiento':
        if ( this.geographicDataForm?.get(field).hasError('required') && this.isTouchedField(this.geographicDataForm, field)) {
          message = 'Es requerido';
        }
        break;

    }
    return message;
  }*/


}
