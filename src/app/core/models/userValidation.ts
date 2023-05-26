/**
 * Interface que moldea un objeto de un usuario a validar
 */
export interface UserValidation {

  tipoDocumento: number,
  numeroIdentificacion: string,
  primerNombre: string,
  segundoNombre: string,
  primerApellido: string,
  segundoApellido: string,
  email: string,
  fechaNacimiento: Date,
  telefonoFijo: string,
  telefonoCelular: string,
  sexo: number,
  genero: number,
  orientacionSexual: number,
  etnia: number,
  estadoCivil: number,
  nivelEducativo: number,
  nacionalidad: number,
  departamentoNacimiento: number,
  ciudadNacimiento: number,
  ciudadNacimientootro: string,
  departamentoResidencia: number,
  ciudadResidencia: number,

  direccion: string,

  idUser : string,
  idUserVentanilla:number,

}
