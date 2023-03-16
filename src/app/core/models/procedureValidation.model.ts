import {UserValidation} from "./userValidation";

/**
 * Interface que moldea un objeto de un tramite a validar
 */
export interface ProcedureValidation {

  "id": number,
  "user": UserValidation,
  "statusId": number,
  "status": string
  "filedNumber": string,
  "dateRequest": Date,
  "dateTracking": Date,
  "titleTypeId": number,
  "instituteId": number,
  "professionId": number,
  "diplomaNumber": number,
  "graduationCertificate": string,
  "endDate": Date,
  "book": string,
  "folio": string,
  "yearTitle": number,
  "professionalCard": string

}
