import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesibilityComponent } from './components/layout/accesibility/accesibility.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { GoUpComponent } from './components/layout/go-up/go-up.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AccesibilityComponent,
    FooterComponent,
    GoUpComponent,
    HeaderComponent,
    BreadcrumbComponent
  ],
  exports: [
    HeaderComponent,
    AccesibilityComponent,
    GoUpComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class CoreModule { }
