import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";

/**
 * Component encargado de la accesibilidad de la página
 */
@Component({
  selector: 'app-accesibility',
  templateUrl: './accesibility.component.html',
  styleUrls: ['./accesibility.component.scss']
})
export class AccesibilityComponent implements OnInit{

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
   * @param router
   */
  constructor(@Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,private router: Router) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        let selectores:any[]=[]
        console.log(this.font);

        selectores.push(document.querySelectorAll('html'));
        selectores.push(document.querySelectorAll('div'));
        selectores.push(document.querySelectorAll('a'));
        //selectores.push(document.querySelectorAll('span'));
        selectores.push(document.querySelectorAll('p'));
        selectores.push(document.querySelectorAll('input'));
        selectores.push(document.querySelectorAll('button'));
        selectores.push(document.querySelectorAll('label'));
        selectores.push(document.querySelectorAll('h1'));
        selectores.push(document.querySelectorAll('h2'));
        selectores.push(document.querySelectorAll('h3'));
        selectores.push(document.querySelectorAll('h4'));
        selectores.push(document.querySelectorAll('h5'));

        setTimeout(() => {
          for (let elements of selectores) {
            for (let element of elements) {
              element.style.fontSize = this.font + "px";
            }
          }
          this.renderer.data;
          // document.body.classList.add("body-cs");
        }, 200);
        console.log(this.font);
      }
    });
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

    public disminuirTamanio():void {

    let selectores:any[]=[]
    this.font = this.font === 1 ? this.font : this.font - 1;

      selectores.push(document.querySelectorAll('html'));
      selectores.push(document.querySelectorAll('div'));
      selectores.push(document.querySelectorAll('a'));
      selectores.push(document.querySelectorAll('span'));
      selectores.push(document.querySelectorAll('p'));
      selectores.push(document.querySelectorAll('input'));
      selectores.push(document.querySelectorAll('button'));
      selectores.push(document.querySelectorAll('label'));
      selectores.push(document.querySelectorAll('h1'));
      selectores.push(document.querySelectorAll('h2'));
      selectores.push(document.querySelectorAll('h3'));
      selectores.push(document.querySelectorAll('h4'));
      selectores.push(document.querySelectorAll('h5'));

    for (let elements of selectores) {
      for (let element of elements) {
        element.style.fontSize = this.font + "px";
      }

    }
      console.log(this.font);


  }

  public aumentarTamanio():void {
    let selectores:any[]=[]
    this.font = this.font === 100 ? this.font : this.font + 1;
    selectores.push(document.querySelectorAll('html'));
    selectores.push(document.querySelectorAll('div'));
    selectores.push(document.querySelectorAll('a'));
    selectores.push(document.querySelectorAll('span'));
    selectores.push(document.querySelectorAll('p'));
    selectores.push(document.querySelectorAll('input'));
    selectores.push(document.querySelectorAll('button'));
    selectores.push(document.querySelectorAll('label'));
    selectores.push(document.querySelectorAll('h1'));
    selectores.push(document.querySelectorAll('h2'));
    selectores.push(document.querySelectorAll('h3'));
    selectores.push(document.querySelectorAll('h4'));
    selectores.push(document.querySelectorAll('h5'));
    for (let elements of selectores) {
      for (let element of elements) {
        element.style.fontSize = this.font + "px";
      }

    }
    console.log(this.font);
  }
}

