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
export class TrackingService {

  constructor(private http: HttpClient) { }

  /**
   * Inserta el seguimiento de la solicitud
   * @param tracking
   */
  addTracking(tracking: any) : Observable<any> {
    return this.http.post(`${PROCEDURE_LOCAL_URI}/Tracking/AddTracking`,tracking);
  }

  /**
   * Obtiene el seguimiento de una solicitud
   * @param id
   */
   getTrackingbyid(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Tracking/GetTracking/${id}`);
  }

  /**
   * Obtiene las solicitudes con el mismo numero de id
   * @param id
   */
  getDuplicatedbyid(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Tracking/GetDuplicated/${id}`);
  }

  /**
   * Obtiene las solicitudes con el mismo numero de id
   * @param id
   */
  getValidationDocument(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Tracking/GetValidation/${id}`);
  }

}
