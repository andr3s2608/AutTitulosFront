import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const { PROCEDURE_SHARED_URI } = environment;

/**
 * Service que obtiene las listas de ciudades y relacionados
 */
@Injectable({
  providedIn: 'root'
})
export class CityService {

  /**
   * Construye el servicio City
   * @param http Libreria HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene listado de paises
   */
  getCountries(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Pais/GetPais`);
  }

  /**
   * Obtiene listado de departamentos
   */
  getDepartaments(): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Departamento/GetDepartamento`);
  }

  /**
   * Obtiene municipios por un departamento dado
   * @param depaId ID del departamento para obtener los municipios
   */
  getMunByDepaId(depaId: number): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Municipio/GetMunicipioByIdDepartamento/${ depaId }`);
  }

  /**
   * Obtener Sexo
   */
  getSex(): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetSexo`);
  }

  /**
   * Obtener Genero
   */
  getGender(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetGenero`);
  }

  /**
   *Obtener Orientacion Sexual
   */
  getSexualOrientation(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Sexo/GetOrientacion`);
  }

  /**
   * Obtener Etnia
   */
  getEthnicity(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Etnia/GetEtnia`);
  }



  /**
   *Obtener Nivel Educativo
   */
  getEducationLevel(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/NivelEducativo/GetNivelEducativo`);
  }

  /**
   * Obtener Tipo de Identificacion
   */
  getIdentificationType(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/TipoIdentificacion/GetTipoIdentificacion`);
  }
  /**
   * Obtener lista Upz
   */
  getUpz(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Upz/GetUpz`);
  }
  /**
   * Obtener lista Barrios
   */
  getBarrios(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Barrio/GetBarrios`);
  }
  /**
   * Obtener lista Localidades
   */
  getLocalities(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Localidad/GetAllLocalidad`);
  }
  /**
   * Obtener lista Zonas
   */
  getZones(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/SubRed/GetSubRed`);
  }



}
