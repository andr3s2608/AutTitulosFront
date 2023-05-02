import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const { PROCEDURE_SHARED_URI } = environment;
const { PROCEDURE_SECURITY_URI } = environment;
const { PROCEDURE_NOTIFICATIONS_URI } = environment;
const { PROCEDURE_LOCAL_URI } = environment;

/**
 * Service con los métodos relacionados al registro de una persona
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  /**
   * Obtiene lista de sexos
   */
  public getSex(): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetSexo`);
  }

  /**
   * Obtiene lista de Generos
   */
  public getGender(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetGenero`);
  }

  /**
   * Obtiene lista de Orientaciones Sexuales
   */
  public getSexualOrientation(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetOrientacion`);
  }

  /**
   * Obtiene lista de Etnia
   */
  public getEthnicity(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Etnia/GetEtnia`);
  }


  /**
   * Obtiene lista de Niveles Educativos
   */
  public getEducationLevel(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/NivelEducativo/GetNivelEducativo`);
  }


  /**
   * Obtiene lista de Tipos de Identificacion
   */
  public getIdentificationType(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/TipoIdentificacion/GetTipoIdentificacion`);
  }

  /**
   * Obtiene codigo de ventanilla de un usuario dado su oid del B2C
   * @param oidToken_usuario Id dado por el b2c
   */
  public getCodeVentanillaByIdUser(oidToken_usuario: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_SECURITY_URI}/GetCodeVentanillaByIdUser/${oidToken_usuario}`);
  }

  /**
   * Obtiene la informacion de un usuario dado su codigo de ventanilla
   * @param idCode Codigo de ventanilla a buscar
   */
  public getInfoUserByIdCodeVentanilla(idCode: any): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v2/Persona/GetInfoUserById/${idCode}`);
  }

  /**
   * Consulta si la persona ha aceptado la politica de seguridad
   * @param oidToken_usuario Id dado por el b2c del usuario a buscar
   */
  public getPoliticaSeguridad(oidToken_usuario: string): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/PoliticaSeguridad/GetPoliticaSeguridad/${oidToken_usuario}`);
  }

  /**
   * Agrega la politica de seguridad de un usuario dado su oid del b2c
   * @param datosPersona
   */
  public addPoliticaSeguridad(datosPersona: any): Observable<any> {
    return this.http.post(`${PROCEDURE_SHARED_URI}/v1/PoliticaSeguridad/AddPoliticaSeguridad`, datosPersona);
  }

  /**
   * Guarda Datos Persona Juridica
   */
  public saveLegalPerson(data: any): Observable<any> {
    return this.http.post(`${PROCEDURE_SHARED_URI}/v2/Persona/AddPersonaJuridica`, data);
  }

  /**
   * Guarda Datos Persona Natural
   */
  public saveNaturalPerson(data: any): Observable<any> {
    return this.http.post(`${PROCEDURE_SHARED_URI}/v2/Persona/AddPersonaNatural`, data);
  }

  /**
   * Envia notificacion por email
   * @param cuerpoEmail Cuerpo que se va a enviar
   */
  public sendEmail(cuerpoEmail: any): Observable<any> {
    return this.http.post(`${PROCEDURE_NOTIFICATIONS_URI}/Email/SendMail`, cuerpoEmail);
  }
  /**
   * Obtiene el formato de la notificacion
   * @param idformat numero de formato
   */
  public getFormats(idformat: string): Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Format/GetFormats/${idformat}`);
  }

  /**
   * Obtiene el rol de un usuario dado su oid del b2c
   * @param oid Id dado por el b2c del usuario a buscar
   */
  getRoleByIdUser(oid: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_SECURITY_URI}/GetRoleByIdUser/${oid}`);
  }

  /**
   * Agrega un usuario a la tabla SECURITY
   * @param data
   */
  addUser(data: any): Observable<any> {
    return this.http.post(`${PROCEDURE_SECURITY_URI}/AddUser`, data);
  }

  /**
   * Actualiza un usuario de la tabla SECURITY
   * @param data
   */
  updateUser(data: any): Observable<any> {
    return this.http.put(`${PROCEDURE_SECURITY_URI}/UpdateUser`, data);
  }

  /**
   * Asigna un rol a un usuario
   * @param data
   */
  addUserRol(data: any): Observable<any> {
    return this.http.post(`${PROCEDURE_SECURITY_URI}/AddUserRole`, data);
  }

}
