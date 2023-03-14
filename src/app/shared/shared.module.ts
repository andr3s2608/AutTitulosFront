import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceLineComponent } from './components/advance-line/advance-line.component';
import { ServiceAreaComponent } from './components/service-area/service-area.component';



@NgModule({
    declarations: [
        AdvanceLineComponent,
        ServiceAreaComponent
    ],
    exports: [
        AdvanceLineComponent,
        ServiceAreaComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
