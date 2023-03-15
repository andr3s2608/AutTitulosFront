import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureComponent} from "./feature.component";
import {LegalPersonComponent} from "./register/pages/legal-person/legal-person.component";
import {NaturalPersonComponent} from "./register/pages/natural-person/natural-person.component";
import {ROUTES} from "../core/enums";
import {UserDeclarationComponent} from "./request/pages/user-declaration/user-declaration.component";
import {UserRequestComponent} from "./request/pages/user-request/user-request.component";
import {ScreenRegisterComponent} from "./register/pages/screen-register/screen-register.component";
import {DocumentsValidationComponent} from "./register/pages/documents-validation/documents-validation.component";
import {PendingChangesGuard} from "../core/guards/pending-changes.guard";
import {UserDashboardComponent} from "./request/pages/user-dashboard/user-dashboard.component";
import {ValidatorsDashboardComponent} from "./tracking/pages/validators-dashboard/validators-dashboard.component";
import {ValidationScreenComponent} from "./tracking/pages/validation-screen/validation-screen.component";
import {ReportPageComponent} from "./reports/pages/report-page/report-page.component";


const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    data: {
      breadcrumb: [
        {
          label: 'Inicio',
          url: ''
        }
      ],
    },
    children: [
      {
        path: ROUTES.REGISTER,
        component: ScreenRegisterComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Registro',
              url: ROUTES.REGISTER
            }
          ]
        },
      },
      {
        path: ROUTES.REGISTER + "/" + ROUTES.REGISTRATION_NATURAL,
        component: NaturalPersonComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Registro',
              url: ROUTES.REGISTER
            },
            {
              label: 'Persona natural',
              url: ROUTES.REGISTER + "/" + ROUTES.REGISTRATION_NATURAL
            }
          ]
        },
      },
      {
        path: ROUTES.REGISTER + "/" + ROUTES.REGISTRATION_LEGAL,
        component: LegalPersonComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Registro',
              url: ROUTES.REGISTER
            },
            {
              label: 'Persona jurídica',
              url: ROUTES.REGISTER + "/" + ROUTES.REGISTRATION_LEGAL,
            }
          ]
        },
      },
      {
        path: ROUTES.DOCUMENTS_VALID,
        component: DocumentsValidationComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            }
          ]
        },
      },
      {
        path: ROUTES.CITIZEN,
        component: UserDeclarationComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización títulos área de la salud',
              url: ROUTES.CITIZEN
            }
          ]
        }
      },
      {
        path: ROUTES.CITIZEN + "/" +ROUTES.CREATE_REQUEST,
        component: UserRequestComponent,
        canDeactivate: [],
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización títulos área de la salud',
              url: ROUTES.CITIZEN
            },
            {
              label: 'Crear solicitud',
              url: ROUTES.CITIZEN + "/" +ROUTES.CREATE_REQUEST
            }
          ]
        },
      },
      {
        path: ROUTES.CITIZEN + "/" + ROUTES.PERSON_DASHBOARD,
        component: UserDashboardComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización títulos área de la salud',
              url: ROUTES.CITIZEN
            },
            {
              label: 'Bandeja de entrada y gestión',
              url: ROUTES.CITIZEN + "/" +ROUTES.PERSON_DASHBOARD
            }
          ]
        },
      },
      {
        path: ROUTES.Validation,
        component: ValidationScreenComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización area de la salud',
              url: ''
            },
            {
              label: 'Validar documentos',
              url: ''
            }
          ]
        },
      },
      {
        path: ROUTES.ValidatorDashboard,
        component: ValidatorsDashboardComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización area de la salud',
              url: ''
            },
            {
              label: 'Bandeja de Entrada',
              url: ''
            }
          ]
        }
      },
      {
        path: ROUTES.ReportsDashboard,
        component: ReportPageComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Solicitar autorización area de la salud',
              url: ''
            },
            {
              label: 'Menú Reportes',
              url: ''
            }
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
