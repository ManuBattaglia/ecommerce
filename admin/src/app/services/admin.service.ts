import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login_admin',data,{headers:headers});
  }

  // PARA OBTENER TOKEN DEL LOCALSTORAGE
  getToken(){
    return localStorage.getItem('token');
  }

  public estaAutenticado(rolesPermitidos : string[]):boolean{
    
    const token = localStorage.getItem('token');

    // COMPROBAR SI TENGO TOKEN
    if(!token){
        return false;
      }

      try {
        const helper = new JwtHelperService();
        var decodedToken = helper.decodeToken(<any>token);   
        
        console.log(decodedToken);
        // VALIDAR TOKEN
        if(!decodedToken){
          //console.log('No es valido');
          localStorage.removeItem('token');
          return false;
        }
      } catch (error) {
        localStorage.removeItem('token');
        return false;
      }
      // PUEDE ENTRAR EL ROL ADMIN
      return rolesPermitidos.includes(decodedToken['rol']);
  }
}