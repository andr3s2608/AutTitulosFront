import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProcedureRequestBackDto} from "../models/procedureRequestBack.model";
import {ProcedureResponseSaveBackDto} from "../models/procedureResponseSaveBack.model";
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

  public saveRequest(request: ProcedureRequestBackDto): Observable<ProcedureResponseSaveBackDto> {
    return this.http.post<ProcedureResponseSaveBackDto>(`${PROCEDURE_LOCAL_URI}/Request/AddRequest`, request);
  }

  /**
   * Obtiene los datos de la solicitud
   * @param id
   */
  getRequestbyid(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Request/GetRequestById/${id}`);
  }
  /**
   * Obtiene la bandeja del validador
   * @param id
   */
  getDashboardValidation(finaldate: string,texttosearch:string,selectedfilter:string,pagenumber:string,pagination:string,rol:string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Request/GetDashboard/${finaldate}/${texttosearch}/${selectedfilter}/${pagenumber}/${pagination}/${rol}`);
  }

  /**
   * Obtiene los datos de la solicitud
   * @param Request
   */
  updateRequest(Request:any) : Observable<any> {
    return this.http.put(`${PROCEDURE_LOCAL_URI}/Request/UpdateRequest`, Request);
  }


}
