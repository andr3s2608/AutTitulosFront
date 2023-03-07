import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-person',
  templateUrl: './legal-person.component.html',
  styleUrls: ['./legal-person.component.scss']
})
export class LegalPersonComponent {

    public cadenaRegistro: string;

    constructor() {

      this.cadenaRegistro = "<b>¡Importante!</b><br>Por favor registre los datos exactamente como aparecen en la Registro de Cámara de Comercio, estos\n" +
        "        datos serán usados para la generación de los Documentos asociados al trámite solicitado y su\n" +
        "        posterior reporte a entidades de vigilancia y control.";

    }

}
