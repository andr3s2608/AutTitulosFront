import {Component, Inject, Renderer2} from '@angular/core';
import { DOCUMENT } from "@angular/common";

/**
 * Component encargado de la accesibilidad de la página
 */
@Component({
  selector: 'app-accesibility',
  templateUrl: './accesibility.component.html',
  styleUrls: ['./accesibility.component.scss']
})
export class AccesibilityComponent {

  /**
   * Tamaño de fuente predeterminado
   */
  private font: number = 14;

  /**
   * Bandera para controlar la activacion del contraste
   */
  private activeContrast: any = 0;

  /**
   * Construye el componente Accesibility
   * @param document Representa el DOM
   * @param renderer Representa el render del DOM
   */
  constructor(@Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {
  }


  /**
   * Aumenta el tamaño de la fuente
   */
  public up(): void {
    this.font = this.font === 100 ? this.font : this.font + 1;
    document.querySelector("html").style.fontSize = this.font + "px";
  }

  /**
   * Reduce el tamaño de la fuente
   */
  public down(): void {
    this.font = this.font === 1 ? this.font : this.font - 1;
    document.querySelector("html").style.fontSize = this.font + "px";
  }

  /**
   * Cambia el contraste de la página
   */
  public moveContrast(): void {
    //this.activeContrast = parseInt(localStorage.getItem('contrasteActivo') || '0');
    if (this.activeContrast == 0) {
      console.log('Se activa el contraste');
      this.activeContrast = true;
      //localStorage.setItem('contrasteActivo', '0');
      setTimeout(() => {
        this.renderer.addClass(this.document.body, 'body-cs');
        // document.body.classList.add("body-cs");
      }, 200);
    } else {
      console.log('Se inactiva el contraste');
      this.activeContrast = false;
      //localStorage.setItem('contrasteActivo', '1');
      setTimeout(() => {
        this.renderer.removeClass(this.document.body, 'body-cs');
        // document.body.classList.remove("body-cs");
      }, 200);
    }
  }
}
