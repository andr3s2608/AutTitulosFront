import {Component} from '@angular/core';

/**
 * Componente encargado del formulario de registro de persona juridica
 */
@Component({
  selector: 'app-legal-person',
  templateUrl: './legal-person.component.html',
  styleUrls: ['./legal-person.component.scss']
})
export class LegalPersonComponent {

  /**
   * Cadena con mensaje inicial del formulario
   */
  public cadenaInicioRegistro: string;

  constructor() {

    this.cadenaInicioRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en la Registro de Cámara de Comercio, estos\n" +
      "        datos serán usados para la generación de los Documentos asociados al trámite solicitado y su\n" +
      "        posterior reporte a entidades de vigilancia y control.";

  }

}
