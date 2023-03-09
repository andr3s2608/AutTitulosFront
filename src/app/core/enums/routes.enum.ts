/**
 * Enumeracion con las rutas de la aplicación
 */
export enum ROUTES {

  AUT_TITULOS = 'aut-titulos',

  DOCUMENTS_VALID = 'doc-valid',

  //REGISTRO / LOGIN

  REGISTER = 'registro',
  REGISTRATION_NATURAL = 'persona-natural',
  REGISTRATION_LEGAL = 'persona-juridica',

  ACEPTAR_POLITICA_DATOS = 'aceptar-politica-datos',

  //RecoverPassword = 'recover/password',


  //CIUDADANO

  CITIZEN = 'ciudadano',
  CREATE_REQUEST = 'crear-solicitud',
  PERSON_DASHBOARD = 'listado-solicitudes',

  //FUNCIONARIOS
  ValidatorDashboard = 'validador/bandeja',

  CoordinatorDashboard = 'coordinador/bandeja',

  DirectorDashboard = 'director/bandeja',

  //REPORTES
  ReportsDashboard = 'reportes/dashboard',
  ReportsCanceled = 'reportes/anulados',
  ReportsReturned = 'reportes/devueltos',
  ReportsRevoked = 'reportes/revocados',
  ReportsLicensesGenerated = 'reportes/licencias-generadas',
  ReportsMinistry = 'reportes/ministerio',
  ReportsCCSST = 'reportes/reporte-por-cedula-SST',
  ReportsSolicitudes = 'reportes/reporte-solicitudes',

}
