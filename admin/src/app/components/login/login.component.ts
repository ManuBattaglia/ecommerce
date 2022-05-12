import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from "@angular/router";

declare var jQuery: any;
declare var $:any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any={};
  public usuario: any={};
  public token: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
      this.token = this._adminService.getToken();
   }

  ngOnInit(): void {

    // VERIFICAR SI HAY TOKEN
    if(this.token){
        this._router.navigate(['/']);
    }else{
        // MANTENER EN EL COMPONENTE

    }
  }

  // RECIBE POR PARAMETRO TODO EL FORM
  login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);

      let data = {
        mail: this.user.mail,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              class:'text-danger',
              position: 'topRight',
              message: response.message
          });
          // SI CONECTO 
          }else{
            this.usuario = response.data;
            // GUARDO TOKEN EN EL LOCAL STORAGE DEL NAVEGADOR
            localStorage.setItem('token', response.token);
            // GUARDO LA CLAVE PRIMARIA DEL USUARIO
            localStorage.setItem('_id', response.data._id);

            this._router.navigate(['/']);

          }
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
    }
    else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class:'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son válidos'
      });
    }
  }
}
