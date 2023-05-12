import { Component } from '@angular/core';
import {RequestService} from "../../../services/request.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ROUTES} from "../../../enums";

/**
 * Component encargado del header de la página
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService, private router: Router

  ) {


  }

  public logout ()
  {
    this.authService.signOutCurrentUser();
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.LOGIN)
  }


}
