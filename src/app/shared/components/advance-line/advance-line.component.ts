import { Component, Input } from '@angular/core';

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
   * Modela la barra de progreso
   */
  @Input() currentProgress: number;


}
