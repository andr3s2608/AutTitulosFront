import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonComponent } from './pages/legal-person/legal-person.component';
import { NaturalPersonComponent } from './pages/natural-person/natural-person.component';



@NgModule({
  declarations: [
    LegalPersonComponent,
    NaturalPersonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegisterModule { }
