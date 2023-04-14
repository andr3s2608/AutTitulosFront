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
export class RequestService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de la solicitud
   * @param id
   */
  getRequestbyid(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Request/GetRequestByid/${id}`);
  }

  /**
   * Obtiene los datos de la solicitud
   * @param Request
   */
  updateRequest(Request:any) : Observable<any> {
    return this.http.put(`${PROCEDURE_LOCAL_URI}/Request/UpdateRequest`, Request);
  }


}
