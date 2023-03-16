import { Injectable } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";

/**
 * Service encargado de popups o alertas con estilo GOV
 */
@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  /**
   * Ruta icono de error
   */
  private readonly errorIconPath = 'assets/icons/popup-error.png';

  /**
   * Ruta icono de información
   */
  private readonly infoIconPath = 'assets/icons/popup-info.png';

  /**
   * Ruta icono de confirmación
   */
  private readonly successIconPath = 'assets/icons/popup-success.png';

  constructor(
    private notification: NzNotificationService) { }

  /**
   * Muestra popup de informacion por determinado tiempo
   * @param text Texto a mostrar
   * @param duration Tiempo en milisegundos
   */
  infoAlert(text: string, duration: number) {

    document.documentElement.style.setProperty("--popupBackground", `#3366CC`);

    return this.notification.blank(
      '',
      `<img src="${this.infoIconPath}" />${text}`,
      {
        nzDuration: duration,
        nzPlacement: "bottomRight",
        nzClass: "msab-popup-cdn"
      },
    );
  }

  /**
   * Muestra popup de confirmacion por determinado tiempo
   * @param text Texto a mostrar
   * @param duration Tiempo en milisegundos
   */
  successAlert(text: string, duration: number) {

    document.documentElement.style.setProperty("--popupBackground", `#069169`);

    return this.notification.blank(
      '',
      `<img src="${this.successIconPath}" />${text}`,
      {
        nzDuration: duration,
        nzPlacement: "bottomRight",
        nzClass: "msab-popup-cdn"
      },
    );
  }

  /**
   * Muestra popup de error por determinado tiempo
   * @param text Texto a mostrar
   * @param duration Tiempo en milisegundos
   */
  errorAlert(text: string, duration: number) {

    document.documentElement.style.setProperty("--popupBackground", `#D11F3E`);

    return this.notification.blank(
      '',
      `<img src="${this.errorIconPath}" />${text}`,
      {
        nzDuration: duration,
        nzPlacement: "bottomRight",
        nzClass: "msab-popup-cdn",
      },
    );
  }
}
