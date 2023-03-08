import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTES} from "../../../../core/enums";

@Component({
  selector: 'app-screen-register',
  templateUrl: './screen-register.component.html'

})
export class ScreenRegisterComponent implements OnInit{


  constructor(
              private router: Router

  )
  {

  }
  ngOnInit(): void {
  }

  Natural(): void {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.REGISTER+"/"+ROUTES.REGISTRATION_NATURAL);
  }
  Juridica(): void {
    this.router.navigateByUrl(ROUTES.AUT_TITULOS+"/"+ ROUTES.REGISTER+"/"+ROUTES.REGISTRATION_LEGAL);
  }

}
