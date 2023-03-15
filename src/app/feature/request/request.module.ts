import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { UserDeclarationComponent } from './pages/user-declaration/user-declaration.component';
import {DemoNgZorroAntdModule} from "../../core/modules/ng-antd.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { RequestDataComponent } from './components/request-data/request-data.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { ResumeRequestSavedComponent } from './components/resume-request-saved/resume-request-saved.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import {PendingChangesGuard} from "../../core/guards/pending-changes.guard";
import {MatPaginatorModule} from "@angular/material/paginator";
import { RequestClarificationComponent } from './components/request-clarification/request-clarification.component';





@NgModule({
    declarations: [
        UserRequestComponent,
        UserDeclarationComponent,
        RequestDataComponent,
        AttachmentsComponent,
        ResumeRequestSavedComponent,
        UserDashboardComponent,
        RequestClarificationComponent
    ],
    exports: [
        RequestDataComponent
    ],
    imports: [
        CommonModule,
        DemoNgZorroAntdModule,
        SharedModule,
        ReactiveFormsModule,
        MatPaginatorModule,
    ]
})
export class RequestModule { }
