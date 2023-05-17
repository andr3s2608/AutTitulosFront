import {Component, Input, OnInit} from '@angular/core';
import {ProcedureRequestBackDto} from "../../../../core/models/procedureRequestBack.model";
import {AppBaseComponent} from "../../../../core/utils";
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent extends AppBaseComponent implements OnInit {

  @Input()
  public editRequest: any;


  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log("request recibido", this.editRequest);
  }

}
