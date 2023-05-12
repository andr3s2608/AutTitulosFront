import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

/**
 * Servicio para el flujo de documentos adjuntos
 */
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  /**
   * Subject que moldea la activación o no para subir el documento de tarjeta profesional
   */
  private professionalCard: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Observable para subscripcion del subject professionalCard
   */
  public readonly showProfessionalCard: Observable<boolean> = this.professionalCard.asObservable();

  constructor() { }

  /**
   * Cambia el valor del subject professionalCard
   * @param show True para habilitar, false de lo contrario
   */
  public setShowProfessionalCard(show: boolean): void {
    this.professionalCard.next(show);
  }

}
