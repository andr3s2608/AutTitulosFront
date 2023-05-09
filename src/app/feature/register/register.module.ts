import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonComponent } from './pages/legal-person/legal-person.component';
import { NaturalPersonComponent } from './pages/natural-person/natural-person.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ScreenRegisterComponent } from './pages/screen-register/screen-register.component';
import { BasicDataCitizenComponent } from './components/basic-data-citizen/basic-data-citizen.component';
import {GeographicDataComponent} from "./components/geographic-data/geographic-data.component";
import { DocumentsValidationComponent } from './pages/documents-validation/documents-validation.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
    declarations: [
        LegalPersonComponent,
        NaturalPersonComponent,
        ScreenRegisterComponent,
        BasicDataCitizenComponent,
        GeographicDataComponent,
        DocumentsValidationComponent,
        LoginComponent


    ],
  exports: [
    BasicDataCitizenComponent,
    GeographicDataComponent,
    GeographicDataComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class RegisterModule { }
