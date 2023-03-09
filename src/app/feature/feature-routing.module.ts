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
import {ValidatorsDashboardComponent} from "./tracking/validators-dashboard/validators-dashboard.component";


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
        path: ROUTES.ValidatorDashboard,
        component: ValidatorsDashboardComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Validar Tramite',
              url: ROUTES.ValidatorDashboard
            },
            {
              label: 'Menú Reportes',
              url: ''
            },
            {
              label: 'Cerrar Sesión',
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
