import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id:any;
  public token:any;
  public _iduser:any;
  public producto: any = {}; 
  public inventarios: Array<any>=[]; 
  public inventario: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
  ) { 
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
  }

 ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id)

        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
            // console.log(response)
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
              console.log(this.producto)

              this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
                response=>{
                  // console.log(response)
                  this.inventarios = response.data;
                  console.log(this.inventarios)
                },
                error=>{
                  console.log(error)
                }
              )
            }
          },
          error=>{
            console.log(error)
          }
        );
      }
    );
  }

  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
      // console.log(this.inventario);

      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser
      }

      console.log(data)

      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
        response=>{
          // console.log(response)
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC740',
            class:'text-success',
            position: 'topRight',
            message: 'Se agrego nuevo stock.'
        });

        this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
          response=>{
            // console.log(response)
            this.inventarios = response.data;
            console.log(this.inventarios)
          },
          error=>{
            console.log(error)
          }
        )

        },
        error=>{
          console.log(error)
        }
      )

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
