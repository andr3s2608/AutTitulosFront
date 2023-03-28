/**
 * Enumeracion con los mensajes de error de los formularios
 */
export enum ErrorMessage {

  IS_REQUIRED = 'Es requerido',

  ONLY_NUMBERS = 'Solo se admiten números',
  ONLY_LETTERS = 'Solo se admiten letras',
  FORMAT_EMAIL = 'No tiene el formato de un email',

  NO_FUTURE_DATE = 'La fecha no puede ser superior a la de hoy',

  ONLY_ONE_DOCUMENT = 'Solo puedes agregar un archivo.',

  ONLY_PDF_DOCUMENT = 'Formato no válido. Solo se admiten documentos en formato PDF.',

  MAX_3MB_DOCUMENT = 'El archivo escogido pesa más de 3Mb.'
}
