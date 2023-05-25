import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

import {ROUTES} from "@core-app/enums";

/**
 * Componente encargado de visualizar una linea de avance
 */
@Component({
  selector: 'app-advance-line',
  templateUrl: './advance-line.component.html',
  styleUrls: ['./advance-line.component.scss']
})
export class AdvanceLineComponent {

  /**
   * Modela el numero a pintar
   */
  @Input() step: number;

  /**
   * Detecta la fuente
   */
  @Input() source: any;

  /**
   * Modela la barra de progreso
   */
  @Input() currentProgress: number;

  constructor( private router: Router) {
  }

  public redirect(id:any): void {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+id)
  }

}
