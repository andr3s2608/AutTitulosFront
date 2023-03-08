import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {CoreModule} from "../core/core.module";
import { FeatureComponent } from './feature.component';
import {RegisterModule} from "./register/register.module";


@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
    RegisterModule
  ]
})
export class FeatureModule { }
