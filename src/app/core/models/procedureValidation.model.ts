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
  "diplomaNumber": number,
  "filed_date": Date,
  "graduationCertificate": string,
  "endDate": Date,
  "book": string,
  "folio": string,
  "yearTitle": number,
  "professionalCard": string,
  "name_institute": string,
  "idnumber": string,
  "aplicantnanme": string,

  "name_profesion": string,
  "profesionid": string


}
