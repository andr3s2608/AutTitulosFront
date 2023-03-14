import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidatorsDashboardComponent} from "./components/validators-dashboard/validators-dashboard.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ValidationStatesComponent } from './components/validation-states/validation-states.component';
import { ValidationScreenComponent } from './pages/validation-screen/validation-screen.component';
import {RegisterModule} from "../register/register.module";



@NgModule({
  declarations: [
    ValidatorsDashboardComponent,
    PersonalDataComponent,
    ValidationStatesComponent,
    ValidationScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RegisterModule,

  ]
})

export class TrackingModule { }
