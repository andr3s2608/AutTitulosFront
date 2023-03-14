import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTES} from "../../../../core/enums";

@Component({
  selector: 'app-resume-request-saved',
  templateUrl: './resume-request-saved.component.html',
  styleUrls: ['./resume-request-saved.component.scss']
})
export class ResumeRequestSavedComponent {

  /**
   * Cadena que modela el numero de radicado
   */
  @Input() public numberFiled: string;

  constructor(private router: Router) {
  }

  /**
   * Redirige a la bandeja del ciudadano
   */
  public exit(): void {
    this.router.navigateByUrl(ROUTES.PERSON_DASHBOARD);
  }

}
