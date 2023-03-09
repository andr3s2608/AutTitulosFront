import { Injectable } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private errorIconPath = 'assets/icons/popup-error.png';
  private infoIconPath = 'assets/icons/popup-info.png';
  private successIconPath = 'assets/icons/popup-success.png';

  constructor(
    private notification: NzNotificationService) { }

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
