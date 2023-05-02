import {DocumentSupportDto} from "./documentSupportDto.model";

/**
 * Modelo de una solicitud a enviar al backend para guardar
 */
export interface ProcedureRequestBackDto {

  /**
   * Id de la solicitud
   */
  IdProcedureRequest?: number;

  /**
   * Id Tipo titulo
   */
  IdTitleTypes: number;

  /**
   * Id Tipo estado
   */
  IdStatus_types: number;

  /**
   * Id del instituto
   */
  IdInstitute: number;

  /**
   * Nombre del instituto
   */
  name_institute: string;

  /**
   * Id de la profesion
   */
  IdProfessionInstitute: number;

  /**
   * Nombre de la profesion
   */
  name_profession: string;

  /**
   * Fecha de actualizacion del estado
   */
  last_status_date: Date;

  /**
   * Id de security del usuario
   */
  IdUser: string;

  /**
   * Codigo de ventanilla del usuario
   */
  user_code_ventanilla: number;

  /**
   * Nombre del usuario
   */
  AplicantName: string;

  /**
   * Tipo de documento del usuario
   */
  IdDocument_type: string;

  /**
   * Numero de documento del usuario
   */
  IdNumber: string;

  /**
   * Numero de diploma
   */
  diploma_number?: number;

  /**
   * Acta de grado
   */
  graduation_certificate?: string;

  /**
   * Fecha de terminacion del grado
   */
  end_date: Date;

  /**
   * Libro de la graduacion
   */
  book?: string;

  /**
   * Folio de la graduacion
   */
  folio?: string;

  /**
   * Año de la graduacion
   */
  year_title: number;

  /**
   * Tarjeta profesional
   */
  professional_card?: string;

  /**
   * Id del pais
   */
  IdCountry: number;

  /**
   * Numero de resolucion de convalidacion
   */
  number_resolution_convalidation?: string;

  /**
   * Fecha resolucion convalidacion
   */
  date_resolution_convalidation?: Date;

  /**
   * Id de la entidad
   */
  IdEntity?: number;

  /**
   * Fecha de radicacion
   */
  filed_date: Date;

  /**
   * Numero de radicado
   */
  filed_number?: string;

  /**
   * Lista de documentos de la solicitud
   */
  documentsSupport?: Array<DocumentSupportDto>
}
