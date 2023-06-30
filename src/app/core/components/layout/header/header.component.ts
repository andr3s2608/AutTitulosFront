import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, PopUpService} from "@core-app/services";
import {ROUTES} from "@core-app/enums";

/**
 * Component encargado del header de la página
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public currentuser:any=JSON.parse(localStorage.getItem('currentUser'));

  constructor(public authService: AuthService, private router: Router, private popUpService: PopUpService) {

    authService.getLoggedInName.subscribe((name: string) => this.changeName());
  }
  private changeName(): void {
    this.currentuser=JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Cierra la sesión del usuario
   */
  public logout ()
  {
    this.currentuser=undefined;
    this.authService.signOutCurrentUser();
    console.log(localStorage.getItem('currentUser'));
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ROUTES.LOGIN).then(value => {
      this.popUpService.infoAlert("Sesión cerrada correctamente", 2000);
    })
  }


}
