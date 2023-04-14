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
export class ResolutionService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el estados por rol
   * @param rol
   */
  getResolutions() : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Resolutions/GetAllResolutions`);
  }

  /**
   * Obtiene el estados por rol
   * @param rol
   */
  addResolution(resolution: any) : Observable<any> {
    return this.http.post(`${PROCEDURE_LOCAL_URI}/Resolutions/AddResolution`,resolution);
  }


}
