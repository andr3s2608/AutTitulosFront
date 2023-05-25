import { Component } from '@angular/core';
import {Router} from "@angular/router";

import Swal from "sweetalert2";

import {ROUTES} from "@core-app/enums";
import {AuthService} from "@core-app/services";

/**
 * Componente para mostrar la declaración juramentada al ciudadano
 */
@Component({
  selector: 'app-user-declaration',
  templateUrl: './user-declaration.component.html',
  styleUrls: ['./user-declaration.component.scss']
})
export class UserDeclarationComponent {

  /**
   * Mensaje declaracion juramentada
   */
  public cadenaDeclaracion: string;

  constructor(private router: Router, private authService: AuthService) {
    this.cadenaDeclaracion = "<br><b>Señor Ciudadano(a):</b><br><br>" +
      "El siguiente Trámite se denomina 'Registro y Autorización de Títulos en el Área de la Salud, para las" +
      " tecnologías, ocupaciones u oficios en el área salud y para las profesiones de Psicología y Gerontología'.<br>" +

      "<br>Los documentos requeridos (Cédula, Diploma, Acta de Grado, Tarjeta Profesional (para Psicólogos), " +
      "Resolución de Convalidación (cuando se requiere)), deben ser cargados en el orden y espacio establecido para" +
      " tal fin, y no deben ser cargados documentos diferentes.<br>" +

      "<br>En caso de ser cargados en desorden o que no cumplan con los requisitos exigidos, será devuelta la inscripción.<br>" +

      "<br>Los documentos adjuntados están sujetos a verificación ante las autoridades que los emitieron.<br>" +

      "<br>Si ya usted cuenta con esta autorización para el Ejercicio de la Profesión u Ocupación emitida anteriormente" +
      " por alguna Secretaría de Salud o Colegio para la misma Profesión, Ocupación u Oficio, no deberá realizarlo nuevamente." +
      " De acuerdo a la normatividad vigente, usted no debe solicitar otra resolución para la misma profesión, si ya cuenta con ella.<br>" +

      "<br>Acorde con lo anterior, manifiesto expresamente y Bajo la Gravedad de Juramento, que no he sido autorizado" +
      " ni he iniciado el trámite para ser autorizado para ejercer mi profesión, ocupación u oficio en salud por ningún" +
      " ente territorial en el país o colegio de profesionales, así como que los documentos cargados en esta plataforma" +
      " a título personal son auténticos.";
  }

  public accept(): void {
    //Guardar en localStorage que aceptó declaración
    this.router.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.CITIZEN + "/" + ROUTES.CREATE_REQUEST);
  }

  public notAccept(): void {
    this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.LOGIN}`).then(x => {
      this.authService.signOutCurrentUser();
      Swal.fire({
        icon: 'error',
        title: 'Declaración juramentada',
        text: 'Debe aceptar la declaración para ingresar en la plataforma'
      });
    });
    //Cerrar sesión?
  }


}
