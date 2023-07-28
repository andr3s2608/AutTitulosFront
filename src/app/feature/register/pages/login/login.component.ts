import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {CustomValidators} from "@core-app/utils/custom-validators";
import {ErrorMessage, HasErrorForm, Rol, ROUTES} from "@core-app/enums";
import {AppBaseComponent} from "@core-app/utils";
import {PopUpService, AuthService} from "@core-app/services";
import {Authentication} from "@core-app/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppBaseComponent {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private popupAlert: PopUpService,
              private authService: AuthService) {
    super();
    this.loginForm = this.fb.group(
      {
        email: [ "", [ Validators.required, CustomValidators.formatEmail ] ],
        password: [ "", [ Validators.required ] ],
      }
    );
  }

  public submitLoginForm(): void {


    try {


/*
      this.authService.internalLogin(payload).subscribe({
        next: value => {
          if (value.rol == Rol.Citizen) {
            this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.CITIZEN}`);
          } else {
            this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.ValidatorDashboard}`);
          }
          this.popupAlert.successAlert('Bienvenido(a) a la Secretaría de Salud Bogotá.', 4000);
        }
      });

       */
      console.log('va a entrar')
      this.authService.B2CLogin();

    } catch (e) {
      this.popupAlert.errorAlert('Ocurrió un error al iniciar sesión.', 4000);
    }

  }
  public Register(): void{

    this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.REGISTER}`);
  }
  public validacion():void
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.DOCUMENTS_VALID);
  }

  public getErrorMessage(field: string): string {
    let message;
    const required: Array<string> = ["email", "password"];
    const email: Array<string> = ["email"];

    if (this.isTouchedField(this.loginForm, field)) {
      if (required.includes(field) && this.loginForm?.get(field).hasError(HasErrorForm.REQUIRED)) {
        message = ErrorMessage.IS_REQUIRED;
      } else if (email.includes(field) &&  this.loginForm?.get(field).hasError(HasErrorForm.EMAIL)) {
        message = ErrorMessage.FORMAT_EMAIL;
      }
    }

    return message;
  }


}
