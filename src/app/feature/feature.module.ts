import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {CoreModule} from "../core/core.module";
import { FeatureComponent } from './feature.component';


@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
  ]
})
export class FeatureModule { }
