/**
 * Enumeracion con las rutas de la aplicación
 */
export enum ROUTES {

  AUT_TITULOS = 'aut-titulos',

  //REGISTRO / LOGIN

  REGISTER = 'registro',
  RegistrationNatural = 'persona-natural',
  RegistrationLegal = 'persona-juridica',

  ACEPTAR_POLITICA_DATOS = 'registro/aceptarPoliticaDatos',

  //RecoverPassword = 'recover/password',


  //CIUDADANO

  AddRequestProcedure15 = 'ciudadano/crear-solicitud',
  PERSON_DASHBOARD = 'ciudadano/listado-solicitudes',

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
