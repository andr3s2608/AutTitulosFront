import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../../core/utils/custom-validators";
import {ErrorMessage, HasErrorForm} from "../../../../core/enums/errorMessage.enum";
import {AppBaseComponent} from "../../../../core/utils";
import {PopUpService} from "../../../../core/services";
import {Authentication} from "../../../../core/models/auth.model";
import {Rol, ROUTES} from "../../../../core/enums";
import {AuthService} from "../../../../core/services/auth.service";

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

    if (!this.loginForm.valid) {
      this.popupAlert.errorAlert('Hay errores en el formulario, revise por favor.', 4000);
      console.log("FORMULARIO PROCESADO");
      console.log(this.loginForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.loginForm));
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: Authentication = {
      // email: this.loginForm.get('email').value,
      userName: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.popupAlert.infoAlert('Iniciando sesión...', 4000);

    try {
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
    } catch (e) {
      this.popupAlert.errorAlert('Ocurrió un error al iniciar sesión.', 4000);
    }

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
