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
export class IesService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el listado de instituciones
   */
  getInstitutes() : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/programas/GetInstitutes`);
  }

  /**
   * Obtiene el listado de programas por institucion
   * @param id
   */
  getProgramsbyId(id: number) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/programas/GetProgramsbyid/${id}`);
  }



}
