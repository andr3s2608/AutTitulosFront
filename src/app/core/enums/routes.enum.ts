export enum ROUTES {

  AUT_TITULOS = 'sst',

  //REGISTRO / LOGIN
  RegistrationNatural = 'registro/natural',
  RegistrationLegal = 'registro/juridica',

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
