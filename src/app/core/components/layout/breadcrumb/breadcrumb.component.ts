import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Breadcrumb} from "../../../models";
import {BreadcrumbService} from "../../../services";

/**
 * Componente que moldea una miga de pan
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$: Observable<Breadcrumb[]>;
  lastSection: any;
  mapRoutes: any;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {
    this.breadcrumbService.getView$.subscribe(last => {
      this.lastSection = last
      console.log(last);
    });
    this.breadcrumbs$.subscribe(r => {
      try {
        const [ label, url ] = r.filter(this.getLast);
        this.mapRoutes = label?.label;
        console.log(this.mapRoutes);
      } catch (e) {
        throw e;
      }
    })
  }

  isInboxPath(b: any): boolean {
    return b?.url === '';
  }

  getLast = (element: any, index: number, array: any) => {
    if (index === array.length - 1) {
      return element;
    }
  }

}
