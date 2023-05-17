import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ROUTES} from "../../../enums";
import {PopUpService} from "../../../services";

/**
 * Component encargado del header de la página
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService, private router: Router, private popUpService: PopUpService) {
  }

  /**
   * Cierra la sesión del usuario
   */
  public logout ()
  {
    this.authService.signOutCurrentUser();
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.LOGIN).then(value => {
      this.popUpService.infoAlert("Sesión cerrada correctamente", 2000);
    })
  }


}
