import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidatorsDashboardComponent} from "./pages/validators-dashboard/validators-dashboard.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ValidationStatesComponent } from './components/validation-states/validation-states.component';
import { ValidationScreenComponent } from './pages/validation-screen/validation-screen.component';
import {RegisterModule} from "../register/register.module";
import {RequestModule} from "../request/request.module";
import { AttachmentViewerComponent } from './components/attachment-viewer/attachment-viewer.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    ValidatorsDashboardComponent,
    PersonalDataComponent,
    ValidationStatesComponent,
    ValidationScreenComponent,
    AttachmentViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RegisterModule,
    RequestModule,
    SharedModule,

  ]
})

export class TrackingModule { }
