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
  public getCountries(): Observable<any>{
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Pais/GetPais`);
  }

  /**
   * Obtiene listado de departamentos
   */
  public getDepartaments(): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Departamento/GetDepartamento`);
  }

  /**
   * Obtiene municipios por un departamento dado
   * @param depaId ID del departamento para obtener los municipios
   */
  public getMunByDepaId(depaId: number): Observable<any> {
    return this.http.get(`${PROCEDURE_SHARED_URI}/v1/Municipio/GetMunicipioByIdDepartamento/${ depaId }`);
  }

}
