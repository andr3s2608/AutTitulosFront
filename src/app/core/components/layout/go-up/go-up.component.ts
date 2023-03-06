import { Component } from '@angular/core';

/**
 * Componente encargado del scroll "Volver arriba" de la página
 */
@Component({
  selector: 'app-go-up',
  templateUrl: './go-up.component.html',
  styleUrls: ['./go-up.component.scss']
})
export class GoUpComponent {

  /**
   * Realiza un scroll hacia la parte superior de la página
   */
  public letGoTop(): void {
    let mainInter = document.getElementById('interno');
    mainInter?.scroll(0, 0);
    let main = document.getElementById('content-layout-id');
    main?.scroll(0, 0);
  }

}
