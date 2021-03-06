import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var $:any;

declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto:any = {};
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer ='assets/img/01.jpg';
  public token:any;

  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
      this.token = this._adminService.getToken()
   }

  ngOnInit(): void {
  }
  
  registro(registroForm:any){
    if(registroForm.valid){
      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class:'text-danger',
          position: 'topRight',
          message: 'Debe subir una imagen'
      });
      }else {
          console.log(this.producto);
          console.log(this.file);
        
        this._productoService.registrar_producto_admin(this.producto, this.file, this.token).subscribe(
          response=>{
            console.log(response);
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC740',
              class:'text-success',
              position: 'topRight',
              message: 'Se registro correctamente el nuevo producto.'
          });
          
          this._router.navigate(['/panel/productos']);

          },
            error=>{
              console.log(error);
          }
      );
      }
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

  fileChangeEvent(event:any):void{
    var file:any;
    // SI HAY UNA IMAGEN 
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      // console.log(file)
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position: 'topRight',
        message: 'No hay imagen'
      });
        $('#input-portada').text('Seleccionar imagen')
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || 'image/webp' || 'image/jpg' || 'image/jpeg' || 'image/gif'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        // console.log(this.imgSelect);
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class:'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
      });
        $('#input-portada').text('Seleccionar imagen')  ;
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
    });
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    // console.log(this.file);
  }
}
