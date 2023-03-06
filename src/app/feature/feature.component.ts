import {Component, OnInit} from '@angular/core';
import {AppBaseComponent} from "../core/utils";

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

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

}
