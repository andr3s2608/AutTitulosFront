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
export class DocumentsService {

  constructor(private http: HttpClient) { }



  /**
   * Obtiene los documentos de la solicitud
   * @param id
   */
  getDocumentsbyid(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Document/GetDocumentsByid/${id}`);
  }

  /**
   * actualiza los documentos de la solicitud
   * @param rol
   */
  updateDocumentsbyid(documents: any) : Observable<any> {
    return this.http.put(`${PROCEDURE_LOCAL_URI}/Document/UpdateDocuments`,documents);
  }



}
