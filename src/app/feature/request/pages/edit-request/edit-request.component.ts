import {Component, Input, OnInit} from '@angular/core';

import {AppBaseComponent} from "@core-app/utils";

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

  }

}
