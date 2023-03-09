import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { UserDeclarationComponent } from './pages/user-declaration/user-declaration.component';

import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";




@NgModule({
  declarations: [
    UserRequestComponent,
    UserDeclarationComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class RequestModule { }
