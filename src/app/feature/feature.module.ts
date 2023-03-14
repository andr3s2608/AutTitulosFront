import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {CoreModule} from "../core/core.module";
import { FeatureComponent } from './feature.component';
import {RegisterModule} from "./register/register.module";
import {RequestModule} from "./request/request.module";
import {TrackingModule} from "./tracking/tracking.module";




@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
    RegisterModule,
    RequestModule,
    TrackingModule

  ]
})
export class FeatureModule { }
