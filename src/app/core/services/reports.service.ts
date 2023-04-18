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
export class ReportsService {

  constructor(private http: HttpClient) { }
  /**
   * Obtiene la bandeja de reportes
   * @param id
   */
  getReportsDashboard(initial: string,finaldate: string,
                         texttosearch:string,selectedfilter:string,iduser: string,
                         pagenumber:string,pagination:string
                         ) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Request/GetReports/${initial}/${finaldate}/${texttosearch}/${selectedfilter}/${iduser}/${pagenumber}/${pagination}`);
  }

}
