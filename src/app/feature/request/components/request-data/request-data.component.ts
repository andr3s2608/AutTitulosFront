import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";
import {ErrorMessage} from "../../../../core/enums/errorMessage.enum";
import {RequestService} from "../../../../core/services/request.service";
import {IesServices} from "../../../../core/services/ies.services";
import {AttachmentsComponent} from "../attachments/attachments.component";
import {AttachmentService} from "../../../../core/services/attachment.service";

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
   * Centinela para mostrar el campo de tarjeta profesional
   */
  public showProfessionalCard: boolean;

  constructor(private controlContainer: ControlContainer,
              private iesServices: IesServices,
              private attachmentService: AttachmentService) {
    super();
    this.iesServices.getInstitutes().subscribe(resp => this.listInstitutes = resp.data);
    this.attachmentService.showProfessionalCard.subscribe(value => this.showProfessionalCard = value);
  }

  ngOnInit(): void {
    this.requestDataForm = this.controlContainer.control;
    this.requestDataForm = this.requestDataForm.controls['requestDataForm'];


    if(this.requestDataForm.get('instituteId').value!='' && this.requestDataForm.get('instituteId').value!=null)
    {
      this.getPrograms();
    }
  }

  /**
   * Devuelve un la lista de los programas por institucion
   */
  public async getPrograms() {

    let institute = this.requestDataForm.get('instituteId').value;




    if(institute.length>2)
    {
      console.log("mostrar institute", institute)
      console.log('entro');
      institute=institute.split(',');
      this.requestDataForm.get('professionId').setValue('');
    }
    console.log("mostrar institute", institute)
    console.log("mostrar proffession", this.requestDataForm.get("professionId").value)

    this.iesServices.getProgramsbyId(institute[0]).subscribe(resp2 => {
      this.listProfessions = resp2.data;
    });

  }


  public activeProfesionalCard(pProfession: any): void {
    let profession = pProfession.value.split(",");
    profession = profession[2]
    console.log("entré a active", profession);

    if (profession == "Formación técnica profesional" || profession == "Tecnológico") {
      this.attachmentService.setShowProfessionalCard(false);
      this.showProfessionalCard = false;
    } else {
      this.attachmentService.setShowProfessionalCard(true);
      this.showProfessionalCard = true;
    }

  }


  /**
   * Devuelve un mensaje de validación de un campo del formulario
   * @param field Campo a validar
   * @returns Mensaje de error del campo
   */
  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ['titleTypeId', 'instituteId', 'professionId', 'endDate', 'yearTitle', 'professionalCard'];
    const onlyNumber: Array<string> = ['diplomaNumber', 'yearTitle'];
    const dateError: Array<string> = ['endDate', 'yearTitle'];

    if (this.isTouchedField(this.requestDataForm, field)) {

      if (required.includes(field) && this.requestDataForm?.get(field).hasError('required') ) {
        message = ErrorMessage.IS_REQUIRED;
      }
      else if (onlyNumber.includes(field) && this.requestDataForm?.get(field).hasError('pattern') ) {
        message = ErrorMessage.ONLY_NUMBERS;
      }
      else if (dateError.includes(field) && this.requestDataForm?.get(field).hasError('invalidDate') ) {
        message = ErrorMessage.NO_FUTURE_DATE;
      }
      else if (field == 'yearTitle') {
        if (this.requestDataForm?.get(field).hasError('minlength') ) {
          message = "Debe tener mínimo 4 caracteres";
        } else if (this.requestDataForm?.get(field).hasError('maxlength')) {
          message = "Debe tener máximo 4 caracteres";
        }
      }

    }

    return message;
  }

}
