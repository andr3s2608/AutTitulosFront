import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonComponent } from './pages/legal-person/legal-person.component';
import { NaturalPersonComponent } from './pages/natural-person/natural-person.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ScreenRegisterComponent } from './pages/screen-register/screen-register.component';



@NgModule({
  declarations: [
    LegalPersonComponent,
    NaturalPersonComponent,
    ScreenRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
