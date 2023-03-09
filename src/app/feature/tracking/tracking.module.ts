import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidatorsDashboardComponent} from "./validators-dashboard/validators-dashboard.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ValidatorsDashboardComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ReactiveFormsModule

  ]
})
export class TrackingModule { }
