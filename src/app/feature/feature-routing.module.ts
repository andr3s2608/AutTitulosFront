import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureComponent} from "./feature.component";

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    data: {
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'asdfadfs',
          activate: false
        }
      ]
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
