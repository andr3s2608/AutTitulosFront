import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {ArchiveService, PopUpService} from "../../../../core/services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils";

import {Observable} from "rxjs";
import {Router, UrlTree} from "@angular/router";
import {OnExit} from "../../../../core/guards/pending-changes.guard";
import {ROUTES} from "../../../../core/enums";

/**
 * Componente que moldea la página de la solicitud del ciudadano
 */
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent extends AppBaseComponent implements OnInit, OnExit  {

  /**
   * Ruta de la imagen del popup inicial
   */
  private readonly rutaImagenPopUpInicial: string;

  /**
   * Ruta del pdf con el listado de instituciones
   */
  private readonly rutaPdfListadoInstituciones: string;

  /**
   * Modela el numero a pintar en la linea de avance
   */
  public stepAdvanceLine: number;

  /**
   * Modela la barra de progreso a pintar en la linea de avance
   */
  public currentProgressAdvanceLine: number;

  /**
   * Centinela que habilita el formulario de la solicitud
   */
  public showRequestForm: boolean;

  /**
   * Centinela que habilita la pantalla de solicitud creada
   */
  public showResumeRequestSaved: boolean;

  /**
   * Centinela que indica si la solicitud se está guardando
   */
  public sending: boolean;

  /**
   * Cadena que modela el numero de radicado cuando se guarda la solicitud
   */
  public numberFiled: string;

  /**
   * Formulario reactivo de la solicitud
   */
  public requestForm: FormGroup;

  constructor(private archiveService: ArchiveService,
              private popupAlert: PopUpService,
              private fb: FormBuilder,
              private route: Router) {
    super();
    this.rutaImagenPopUpInicial = './assets/images/infografia-popup-inicial.jpg'
    this.rutaPdfListadoInstituciones = './assets/binaries/listado.pdf'
    this.stepAdvanceLine = 2;
    this.currentProgressAdvanceLine = 28;
    this.showRequestForm = false;
    this.showResumeRequestSaved = false;
    this.sending = false;

    this.requestForm = this.fb.group({
      requestDataForm: this.fb.group({
        titleTypeId: [ '', [ Validators.required ] ],
        instituteId: [ '', [ Validators.required ] ],
        professionId: [ '', [ Validators.required ] ],
        diplomaNumber: [ '', [ Validators.pattern("^[0-9]*$") ] ],
        graduationCertificate: [ '', [ ] ],
        endDate: [ '', [ Validators.required, super.dateValidator ] ],
        book: [ '', [ ] ],
        folio: [ '', [ ] ],
        yearTitle: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$") ] ],
        professionalCard: [],
        nameInternationalUniversity: [],
        countryId: [],
        numberResolutionConvalidation: [],
        dateResolutionConvalidation: [],
        entityId: []
      }),
      attachmentForm: this.fb.group({
        quantityDocuments: [],
        documentSupports: [[]]
      })
    });
  }


  ngOnInit(): void {

    //Mensaje de confirmacion al intentar recargar o salir de la página si se está guardadnop la solicitud
    window.addEventListener('beforeunload', (event) => {
      if(this.sending){
        event.returnValue = '¿Estás seguro de que deseas salir de esta página?';
      }
    });

    this.popUpInicial();
  }

  public redirectionDashboard(): void {
    this.route.navigateByUrl(ROUTES.AUT_TITULOS + "/" + ROUTES.CITIZEN + "/" +ROUTES.PERSON_DASHBOARD);
  }


  /**
   * Lanza popup con la infografia del trámite
   */
  private popUpInicial(): void {
    Swal.fire({
      title: 'Información importante',
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3366CC',
      showDenyButton: true,
      denyButtonText: 'Ver listado',
      denyButtonColor: '#3366CC',
      html: `<img alt='registro-titulos' src='${this.rutaImagenPopUpInicial}' style="width: 100%;">`,
      width: '60%',
    }).then( result => {
      if (result.isDenied) {
        this.archiveService.downloadArchive(this.rutaPdfListadoInstituciones,'listadoInstituciones', '.pdf');
      }
    });
  }


  /**
   * Guarda la solicitud realizada por el ciudadano
   */
  public async saveRequest(): Promise<void> {

    const formData = this.requestForm.value;
    const requestDataForm = formData['requestDataForm'];
    const attachmentForm = formData['attachmentForm'];


    if (!this.requestForm.valid) {
      this.popupAlert.errorAlert(
        `Por favor, revise el formulario de la solicitud, hay datos inválidos y/o incompletos.`,
        4000
      );
      console.log("FORMULARIO PROCESADO");
      console.log(this.requestForm.value);
      console.log("ERRORES FORMULARIO");
      console.log(super.getAllErrors(this.requestForm));
      this.requestForm.markAllAsTouched();
      return;
    }

    if (attachmentForm.documentSupports.length < attachmentForm.quantityDocuments) {
      this.popupAlert.errorAlert(
        'Hay requisitos sin documentos adjuntos, ¡revise por favor!',
        4000);
      return;
    }


    this.sending = true;
    this.numberFiled = "AUT2022REQUEST01"
    this.finishProcedure(this.numberFiled);

  }

  private finishProcedure(numberFiled: string): void {

    this.showRequestForm = false;
    this.showResumeRequestSaved = true;
    this.stepAdvanceLine = 3;
    this.currentProgressAdvanceLine = 60;
  }




  onExit(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("estoy aqui")




    const rta = confirm('Are you sure?');
    return rta;



    /*

    if (this.sending == true) {
      this.confirmDialog('seguro de que desea salir?').then(r => {
        console.log(r)
        return r;
      }).catch(e => {
        console.log('entré al catch', e)
        return false;
      })

      //Swal.fire('No puedes salir de la página ya que se está guardando el formulario.');
      /*console.log('no puedes salir')
      let aqui = window.confirm("Quieres salir?")
      console.log(aqui)
      return aqui*/

      /*
            Swal.fire({
              text: 'salir',
              showConfirmButton: true,
            }).then( result => {
              if(result.isConfirmed){
                console.log('entre en el then')
                exit = true;
                return false;
              } else {
                return true;
              }
            })
          }else {
            console.log('retornare algo')
            return exit;
          }
    } else {
      console.log('retornare algo2')
      return false;
    }*/


  }

  public confirmDialog(msg:any) {
    return new Promise(function (resolve, reject) {
      let confirmed = window.confirm(msg);

      return confirmed ? resolve(true) : reject(false);
    });
  }

}
