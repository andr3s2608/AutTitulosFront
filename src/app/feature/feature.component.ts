import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../core/utils";
import {Router} from "@angular/router";
import {ROUTES} from "../core/enums";
import {AuthGuardService} from "../core/guards/auth-guard.service";
import {AuthService} from "../core/services/auth.service";

/**
 * Componente que agrupa todos los feature
 */
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent extends AppBaseComponent implements OnInit {

  public isIframe = false;

  public ocultarRegistroValidacion = false;

  constructor( private router: Router, private authService: AuthService)
  {
    super();
  }


  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.router.navigateByUrl(`${ROUTES.AUT_TITULOS}/${ROUTES.LOGIN}`);
  }

  public registro():void
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.REGISTER);
  }
  public validacion():void
  {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.DOCUMENTS_VALID);
  }

}
