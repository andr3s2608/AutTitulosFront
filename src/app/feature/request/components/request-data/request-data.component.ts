import {Component, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";

import {AppBaseComponent} from "@core-app/utils";
import {ErrorMessage} from "@core-app/enums";
import {AttachmentService, CityService, IesService} from "@core-app/services";

/**
 * Componente hijo para la información de la solicitud
 */
@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.scss']
})
export class RequestDataComponent extends AppBaseComponent implements OnInit {

  /**
   * Formulario hijo de la informacion de la solicitud
   */
  public requestDataForm: any;

  /**
   * Lista de instituciones
   */
  public listInstitutes: any[];

  /**
   * Lista de profesiones
   */
  public listProfessions: any[];

  /**
   * Listado de países
   */
  public listCountries: any[];

  /**
   * Centinela para mostrar el campo de tarjeta profesional
   */
  public showProfessionalCard: boolean;

  /**
   * Centinela para mostrar u ocultar el formulario de titulo extranjero
   */
  public showInternationalForm: boolean;

  constructor(private controlContainer: ControlContainer,
              private iesServices: IesService,
              private attachmentService: AttachmentService,
              private cityService: CityService) {
    super();
    this.showInternationalForm = null;
    this.cityService.getCountries().subscribe(resp => this.listCountries = resp.data);

    this.attachmentService.showProfessionalCard.subscribe(value => this.showProfessionalCard = value);
  }

  ngOnInit(): void {
    this.requestDataForm = this.controlContainer.control;
    this.requestDataForm = this.requestDataForm.controls['requestDataForm'];

    this.iesServices.getInstitutes().subscribe(resp => {
      this.listInstitutes = resp.data;


      if (this.requestDataForm.get('instituteId').value != '' && this.requestDataForm.get('instituteId').value != null) {
        this.iesServices.getProgramsbyId(this.requestDataForm.get('instituteId').value)
          .subscribe(resp2 => {this.listProfessions = resp2.data;
         });
      }
    });

    if (this.requestDataForm.get('titleTypeId').value != '') {
      this.showInternationalForm = this.requestDataForm.get('titleTypeId').value == 2;
      this.iesServices.getAllPrograms().subscribe(resp3 => this.listProfessions = resp3.data);
    }

  }

  /**
   * Habilita el formulario del titulo nacional o extranjero
   */
  public showFormNationalOrInternational(): void {
    this.showInternationalForm = this.requestDataForm.get('titleTypeId').value == 2;

    this.attachmentService.setShowProfessionalCard(false);
    this.attachmentService.setShowValidationResolution(this.showInternationalForm);
    if (this.showInternationalForm) {
      this.iesServices.getAllPrograms().subscribe(resp3 => this.listProfessions = resp3.data);
    } else {
      this.listProfessions = null;
    }
    this.requestDataForm.get('professionId').setValue('');
    this.requestDataForm.get('professionName').setValue('');
    this.requestDataForm.get('instituteId').setValue('');
    this.requestDataForm.get('instituteName').setValue('');
    this.requestDataForm.get('entityId').setValue('');
  }

  /**
   * Devuelve un la lista de los programas por institucion
   */
  public async getPrograms() {
    let instituteId = this.requestDataForm.get('instituteId').value;

    const selectedInstitute = this.listInstitutes.find(institute => institute.idInstitute === instituteId);
    this.requestDataForm.get('instituteName').setValue(selectedInstitute.nameinstitute);

    this.requestDataForm.get('professionId').setValue('');
    this.iesServices.getProgramsbyId(instituteId).subscribe(resp2 => {this.listProfessions = resp2.data;
      });
  }


  /**
   * Activa el campo de tarjeta profesional
   * @param pProfession Evento con el tipo de profesion escogida
   */
  public activeProfesionalCard(): void {
    let professionId = this.requestDataForm.get('professionId').value;
    const selectedProfession = this.listProfessions.find(profession => profession.idsniesprogram === professionId);
    this.requestDataForm.get('professionName').setValue(selectedProfession.programname);

    if (selectedProfession.levelEducation == "UNV") {
      if(this.showInternationalForm)
      {this.attachmentService.setShowValidationResolution(false);
        this.attachmentService.setShowProfessionalCard(true);
        this.attachmentService.setShowValidationResolution(this.showInternationalForm);
        this.showProfessionalCard = true;
      }
      else
      {
        this.attachmentService.setShowProfessionalCard(true);
        this.showProfessionalCard = true;
      }

    } else {
      this.attachmentService.setShowProfessionalCard(false);
      this.showProfessionalCard = false;
    }
  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['titleTypeId', 'instituteId', 'professionId', 'endDate', 'yearTitle', 'professionalCard', 'nameInternationalUniversity', 'countryId', 'entityId', 'numberResolutionConvalidation'];
    const onlyNumber: Array<string> = ['yearTitle','diplomaNumber'];
    const dateError: Array<string> = ['dateResolutionConvalidation','endDate', 'yearTitle' ];

    if (this.isTouchedField(this.requestDataForm, field)) {
      if (required.includes(field) && this.requestDataForm?.get(field).hasError('required')) {
        message = ErrorMessage.IS_REQUIRED;
      } else if (onlyNumber.includes(field) && this.requestDataForm?.get(field).hasError('pattern')) {
        message = ErrorMessage.ONLY_NUMBERS;
      } else if (dateError.includes(field) && this.requestDataForm?.get(field).hasError('invalidDate')) {
        message = ErrorMessage.NO_FUTURE_DATE;
      } else if (field == 'yearTitle') {
        if (this.requestDataForm?.get(field).hasError('minlength')) {
          message = "Debe tener mínimo 4 caracteres";
        } else if (this.requestDataForm?.get(field).hasError('maxlength')) {
          message = "Debe tener máximo 4 caracteres";
        }
      }

    }

    return message;
  }

}
