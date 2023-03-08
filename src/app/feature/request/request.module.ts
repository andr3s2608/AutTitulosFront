import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { UserDeclarationComponent } from './pages/user-declaration/user-declaration.component';




@NgModule({
  declarations: [
    UserRequestComponent,
    UserDeclarationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequestModule { }
