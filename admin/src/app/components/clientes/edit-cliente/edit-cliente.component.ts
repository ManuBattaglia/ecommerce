import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente: any = {};
  public id: any;
  public token: any;

  constructor(
    private _rout: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router

    ) { 

      this.token = this._adminService.getToken();
    }

  ngOnInit(): void {
    this._rout.params.subscribe(
      params=>{
        this.id = params['id'];
         console.log(this.id);
        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response =>{
            console.log(response);
            if(response.data == undefined){
              this.cliente = undefined;
            }else{
              this.cliente = response.data;
            }
          },
          error =>{
            // console.log(first)
          }
        )
      }
    )
  }

  actualizar(updateForm:any){
    if(updateForm.valid){
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC740',
            class:'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el nuevo cliente.'
        });
        this._router.navigate(['/panel/clientes']);
        },
        error=>{
        console.log(error);
        }
      );
    }else{
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
