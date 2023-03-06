import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserUtils} from "@azure/msal-browser";

const routes: Routes = [
  {
    path: '',
    canActivate: [/*MsalGuard */],
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
