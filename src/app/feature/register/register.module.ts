import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonComponent } from './pages/legal-person/legal-person.component';
import { NaturalPersonComponent } from './pages/natural-person/natural-person.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationWindowComponent } from './pages/registration-window/registration-window.component';



@NgModule({
  declarations: [
    LegalPersonComponent,
    NaturalPersonComponent,
    RegistrationWindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
