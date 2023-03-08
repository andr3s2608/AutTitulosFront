import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {ArchiveService} from "../../../../core/services/archive.service";

/**
 * Componente que moldea la página de la solicitud del ciudadano
 */
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  /**
   * Ruta de la imagen del popup inicial
   */
  private readonly rutaImagenPopUpInicial: string;

  /**
   * Ruta del pdf con el listado de instituciones
   */
  private readonly rutaPdfListadoInstituciones: string;

  constructor(private archiveService: ArchiveService) {
    this.rutaImagenPopUpInicial = './assets/images/infografia-popup-inicial.jpg'
    this.rutaPdfListadoInstituciones = './assets/binaries/listado.pdf'
  }


  ngOnInit(): void {
    this.popUpInicial();
  }


  public popUpInicial(): void {
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

}
