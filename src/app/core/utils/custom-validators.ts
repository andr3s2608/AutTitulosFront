import {FormControl} from "@angular/forms";

/**
 * Clase para manejar Validadores personalizados
 */
export class CustomValidators {

  /**
   * Valida si el numero ingresado pertenece a una fecha futura
   * @param control
   * @return Null si la fecha es valida, invalidDate: true de lo contrario
   */
  public static numberDateFuture(control: FormControl): { [p: string]: boolean } | null {
    if (control.value) {
      const today = new Date(Date.now()).getFullYear();
      if (control.value > (today)) {
        return {'invalidDate': true }
      }
    }
    return null;
  }

  /**
   * Valida si la fecha ingresada es superior a la fecha actual
   * @param control
   * @return Null si la fecha es valida, invalidDate: true de lo contrario
   */
  public static dateValidator(control: FormControl): { [p: string]: boolean } | null {
    if (control.value) {
      const date = new Date(control.value);
      const today = new Date(Date.now());
      if (date > (today)) {
        return {'invalidDate': true }
      }
    }
    return null;
  }

  /**
   * Valida si el correo ingresado cumple la expresión regular del formato email
   * @param control
   */
  public static formatEmail(control: FormControl): { [p: string]: boolean } | null {
    let email: string = control.value;
    let regex: RegExp = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
      + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

    if (email) {
      if (!regex.test(email)) {
        return {'invalidEmail': true }
      }
    }
    return null;
  }

}
