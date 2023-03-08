import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonComponent } from './pages/legal-person/legal-person.component';
import { NaturalPersonComponent } from './pages/natural-person/natural-person.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LegalPersonComponent,
    NaturalPersonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
