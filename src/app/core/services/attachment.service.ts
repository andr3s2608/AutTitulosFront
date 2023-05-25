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
   * Subject que moldea la activación o no para subir el documento de Tarjeta Profesional
   */
  private professionalCard: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Subject que moldea la activación o no para subir el documento de Resolución de convalidación
   */
  private validationResolution: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Observable para subscripcion del subject professionalCard
   */
  public readonly showProfessionalCard: Observable<boolean> = this.professionalCard.asObservable();

  /**
   * Observable para subscripcion del subject validationResolution
   */
  public readonly showValidationResolution: Observable<boolean> = this.validationResolution.asObservable();

  constructor() { }

  /**
   * Cambia el valor del subject professionalCard
   * @param show True para habilitar, false de lo contrario
   */
  public setShowProfessionalCard(show: boolean): void {
    this.professionalCard.next(show);
  }

  /**
   * Cambia el valor del subject validationResolution
   * @param show True para habilitar, false de lo contrario
   */
  public setShowValidationResolution(show: boolean): void {
    this.validationResolution.next(show);
  }

}
