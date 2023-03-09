import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../core/utils";
import {FormBuilder} from "@angular/forms";
import {CityService} from "../core/services";
import {Router} from "@angular/router";
import {ROUTES} from "../core/enums";

/**
 * Componente que agrupa todos los feature
 */
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent extends AppBaseComponent implements OnInit {
  constructor( private router: Router)
  {
    super();
  }
  public isIframe = false;

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
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
