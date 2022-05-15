import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    genero: ''
  };
  public token;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
    ) { 
      this.token = this._adminService.getToken();
    }

  ngOnInit(): void {
  }

  registro(registroFrom: any){
    if(registroFrom.valid){
      console.log(this.cliente);
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        response =>{
          // console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC740',
            class:'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cliente.'
        });

        this.cliente = {
          genero: '',
          nombre: '',
          apellido: '',
          f_nacimiento: '',
          telefono: '',
          dni: '',
          mail: ''
        }

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