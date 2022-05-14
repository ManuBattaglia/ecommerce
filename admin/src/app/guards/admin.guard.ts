import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
      private _adminService: AdminService,
      private _router: Router
    ){
      
    }

    canActivate():any{
      // SI ES FALSO REDIRECCIONO LOGIN
      // SOLO ROL ADMIN PUEDE ENTRAR
      if(!this._adminService.estaAutenticado(['admin'])){
        this._router.navigate(['/login']);
        return false;
      }
      return true;
  }
}