import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DocumentSupportDto} from "@core-app/models";
const { PROCEDURE_SHARED_URI } = environment;
const { PROCEDURE_SECURITY_URI } = environment;
const { PROCEDURE_NOTIFICATIONS_URI } = environment;
const { PROCEDURE_LOCAL_URI } = environment;
const { PROCEDURE_BLOB_URI } = environment;

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
  getDocumentsByIdRequest(id: string) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Document/GetDocumentsByid/${id}`);
  }

  /**
   * Agrega los documentos a una solicitud
   * @param documents Documentos a guardar
   */
  public addDocumentsToRequest(documents: DocumentSupportDto[]): Observable<any> {
    return this.http.post(`${PROCEDURE_LOCAL_URI}/Document/AddDocuments`, documents);
  }

  /**
   * actualiza los documentos de la solicitud
   * @param rol
   */
  updateDocumentsByIdRequest(documents: any) : Observable<any> {
    return this.http.put(`${PROCEDURE_LOCAL_URI}/Document/UpdateDocuments`,documents);
  }

  /**
   * Obtiene el pdf de la resolucion (preliminar o definitiva)
   * @param rol
   */
  getResolutionPdf(idrequest:string,
                   status:string,
                   rol:string,
                   ma:string,
                   maj:string,
                   maa:string,
                   preliminar:boolean
  ) : Observable<any> {
    return this.http.get(`${PROCEDURE_LOCAL_URI}/Document/GetGeneratedPDF/${idrequest}/${status}/${rol}/${ma}/${maj}/${maa}/${preliminar}`);
  }

}
