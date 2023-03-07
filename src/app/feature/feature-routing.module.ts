import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureComponent} from "./feature.component";
import {LegalPersonComponent} from "./register/pages/legal-person/legal-person.component";
import {NaturalPersonComponent} from "./register/pages/natural-person/natural-person.component";
import {ROUTES} from "../core/enums";

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
      ]
    },
  }, {
    path: ROUTES.REGISTER,
    component: FeatureComponent,
    data: {
      breadcrumb: [
        {
          label: 'Inicio',
          url: ''
        },
        {
          label: 'Registro',
          url: "/"+ROUTES.AUT_TITULOS+"/"+ROUTES.REGISTER
        }
      ]
    },
    children: [
      {
        path: ROUTES.RegistrationNatural,
        component: NaturalPersonComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Registro',
              url: "/"+ROUTES.AUT_TITULOS+"/"+ROUTES.REGISTER
            },
            {
              label: 'Persona natural',
              url: ROUTES.RegistrationNatural
            }
          ]
        },
      },
      {
        path: ROUTES.RegistrationLegal,
        component: LegalPersonComponent,
        data: {
          breadcrumb: [
            {
              label: 'Inicio',
              url: ''
            },
            {
              label: 'Registro',
              url: "/"+ROUTES.AUT_TITULOS+"/"+ROUTES.REGISTER
            },
            {
              label: 'Persona jurídica',
              url: ROUTES.RegistrationLegal
            }
          ]
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
