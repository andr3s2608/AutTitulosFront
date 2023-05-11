import { Injectable } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Rol, ROUTES} from "../enums";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CurrentUserDto} from "../models/currentUserDto";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
              private router: Router) { }

  /**
   * Guardian que redirige a las paginas respectivas de su rol si se encuentra logueado e intenta loguearse de nuevo
   */
  public canActiveLogin(): boolean {

    let user: CurrentUserDto = this.authService.getCurrentUser();
    if (user) {
      if (user.rol == Rol.Citizen) {
        this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.CITIZEN}`);
      } else {
       // this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.ValidatorDashboard}`);

      }
      return true;
    }

    return true;
  }

  /**
   * Guardian que verifica si el usuario está logueado
   */
  public canActiveWithAuth(): boolean {
    let user: CurrentUserDto = this.authService.getCurrentUser();

    if (user) {
      return true;
    }

    this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.LOGIN}`);
    Swal.fire({
      icon: "info",
      title: 'Iniciar sesión',
      text: "Debe estar autenticado"
    })
    return false;
  }

  /**
   * Guardian que valida si tiene un rol de cualquier funcionario
   */
  public canActiveValidators(): boolean {

    if (this.canActiveWithAuth()) {
      let user: CurrentUserDto = this.authService.getCurrentUser();
      if (user.rol == Rol.Validator || user.rol == Rol.Coordinator || user.rol == Rol.Director) {
        return true;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Sin permisos',
      text: 'No tiene los permisos para acceder a la página.'
    });

    return false;
  }

  /**
   * Guardian que valida si tiene un rol de ciudadano
   */
  public canActiveCitizen(): boolean {

    if (this.canActiveWithAuth()) {
      let user: CurrentUserDto = this.authService.getCurrentUser();
      if (user.rol == Rol.Citizen) {
        return true;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Sin permisos',
      text: 'No tiene los permisos para acceder a la página.'
    });

    return false;
  }

}
