import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {CurrentUserDto} from "@core-app/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private listUsers: Array<CurrentUserDto> = [
    {
      userId: "31ab2d61-65b8-4c7d-a793-79cdba31b235",
      codeVentanilla: 1825,
      rol: "Ciudadano",
      fullName: `Persona Natural SDS`,
      email: "avelez@soaint.com",
      documentType: "Cedula de ciudadania",
      documentNumber: "1099324897"
    },
    {
      userId: "fe3a0cef-1348-48fe-b8b8-b743d24f666a",
      codeVentanilla: 1841,
      rol: "Funcionario",
      fullName: `SDS Validador ROl`,
      email: "SDSValidador@outlook.com",
      documentType: "Cedula de ciudadania",
      documentNumber: "100001101"
    },
    {
      userId: "e181c33a-a648-4975-9404-bf6977f00f5c",
      codeVentanilla: 1842,
      rol: "Coordinador",
      fullName: `SDS Coordinador Rol`,
      email: "sdscoordinador@outlook.com",
      documentType: "Cedula de ciudadania",
      documentNumber: "234567890"
    },
    {
      userId: "4ba79be3-d686-4e4d-959a-e14a9a081604",
      codeVentanilla: 1843,
      rol: "Subdirector",
      fullName: `SDS Subdirector Rol`,
      email: "SDSSubdirector@outlook.com",
      documentType: "Cedula de ciudadania",
      documentNumber: "23456789"
    }
  ]


  constructor(private http: HttpClient) { }

  /**
   * Se loguea usando una API vieja, no pasa por el B2C
   */
  public internalLogin(payload: any): Observable<CurrentUserDto> {
    console.log("entre")
    let url: string = 'https://login-appservice-back2.azurewebsites.net/auth';

    return this.http.post<CurrentUserDto>(`${url}/login`, {
        email: payload.userName,
        pwd: payload.password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    ).pipe( map( res => {
      //console.log(res);
      let decodedToken = this.getDecodedAccessToken(res.accessToken);
      console.log(decodedToken);
      let parsedRoles = JSON.parse(decodedToken.access);
      let procedure16Roles = parsedRoles.filter((element:any) => {
        return element.ProcedureName == "Tramite 16"
      });
      console.log(procedure16Roles)
      let role = procedure16Roles[0].RolesDto[0].Rol;

      let currentUser: CurrentUserDto;

      if (role == "Especialista") {
        currentUser = this.listUsers[0];
      } else {
        currentUser = this.listUsers.find(value => value.rol == role);
      }

      switch (role) {
        case "Especialista":
          currentUser = this.listUsers[0];
          break;
        case "Validador":
          currentUser = this.listUsers[1];
          break;
        case "Coordinador":
          currentUser = this.listUsers[2];
          break;
        case "Subdirector":
          currentUser = this.listUsers[3];
          break;
      }

      currentUser = {
        accessToken: res.accessToken,
        ...currentUser
      };
      console.log(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('Role', currentUser.rol);

      return currentUser;
    }));

  }

  /**
   * Decodifica un jwt
   * @param token Token a decodificar
   */
  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  }

  /**
   * Obtiene el usuario de localstorage
   */
  public getCurrentUser(): CurrentUserDto {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  /**
   * Limpia las credenciales del usuario
   */
  public signOutCurrentUser(): void {
    localStorage.clear();
  }

}
