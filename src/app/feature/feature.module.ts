import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {CoreModule} from "../core/core.module";
import { FeatureComponent } from './feature.component';
import {RegisterModule} from "./register/register.module";
import {RequestModule} from "./request/request.module";
import {TrackingModule} from "./tracking/tracking.module";
import {SharedModule} from "../shared/shared.module";
import {ReportsModule} from "./reports/reports.module";
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
    SharedModule,
    RegisterModule,
    RequestModule,
    TrackingModule,
    ReportsModule,
    MatDialogModule,

  ]
})
export class FeatureModule { }
