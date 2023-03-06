import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export class AppBaseComponent {
  clearField = (form: FormGroup, field: string): void => {
    form.get(field).reset()
  }

  isDevelopment = (): boolean => {
    return window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
  }

  openBlankPage = (url: string): void => {
    window.open(url, '_blank');
  }

  isTouchedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched === true && form?.get(field).invalid;
  }

  isNotPristinedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched === true
  }

  isValidField = (form: FormGroup, field: string): boolean => {
    return (
      form?.get(field).touched && form?.get(field).valid
    );
  }

  isCorrectField = (form: FormGroup, field: string): boolean => {
    return (
      form?.get(field).valid
    );
  }

  isValidEmailFn = (control: AbstractControl): { [key: string]: any } | null => {
    return /^[\w]+([\._-]?\w+)*[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(control.value) ? null :
      {
        invalidEmail: {
          valid: false,
          value: control.value,
          message: 'No es válido, utilice el formato usuario@dominio.com'
        }
      };
  }

  isValidWebsiteFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (/^([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))?$/gi.test(control.value) === true || control.value === null)
      return null
    else
      return {
        invalidWebsite: {
          valid: false,
          value: control.value,
          message: 'No es válido, utilice el formato www.sitio.com'
        }
      };
  }

  isValidHttpWebsiteFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (/^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))?$/gi.test(control.value) === true || control.value === null || control.value === '')
      return null
    else
      return {
        invalidHttpWebsite: {
          valid: false,
          value: control.value,
          message: 'No es válido, utilice el formato http://www.sitio.com'
        }
      };
  }

  isValidPhoneFn = (control: AbstractControl): { [key: string]: any } | null => {
    return /^[1-9]\d{20}$/.test(control.value) ? null :
      { invalidPhone: { valid: false, value: control.value, message: 'No es válido' } };
  }

  // isValidDate = (control: AbstractControl): { [key: string]: any } | null => {
  //   return /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/.test(control.value) ? null :
  //     {invalidDate: {valid: false, value: control.value, message: 'No es válido'}};
  // }

  isDateValid = (control: AbstractControl) => {
    const date: Date | string = new Date().toString();
    // @ts-ignore
    return (date instanceof Date) ? null : { isNotDateValid: true };
  }

  keyPressNumbers = (event): boolean => {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  keyPressLetters = (event): boolean => {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-ZÑÁÉÍÓÚÜáéíóúüñ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressAlphanumeric = (event): boolean => {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-ZÑÁÉÍÓÚÜáéíóúüñ0-9 #$@!%&*?¡"+,.:;='^|~_()¿{}-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressTelephone = (event): boolean => {
    const inp = String.fromCharCode(event.keyCode);
    if (/[\d #$@!%&*?¡"+,.:;='^|~_()¿{}-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressPhone = (event): boolean => {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  formatDateToSave = (customDate: string): string => {
    const expDate = customDate.split('/');
    return `${ expDate[2] }-${ expDate[1] }-${ expDate[0] }`;
  }

  formatDateToLoad = (customDate: string): string => {
    try {
      const firstExpression = customDate.split('T')[0];
      const secondExpression = firstExpression.split('-');
      return `${ secondExpression[2] }/${ secondExpression[1] }/${ secondExpression[0] }`;
    } catch (e) {
      return customDate;
    }
  }

  removeEndLine = (text) => (text.replace(/[^\n]/, '')).trim();

  /**
   * Valida si la fecha ingresada es superior a la fecha actual
   * @param control
   */
  dateValidator(control: FormControl): { [s: string]: boolean } {
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
   * Retorna todos los errores o validaciones presentes en el FormGroup
   * @param form Form a evaluar
   */
  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

}
