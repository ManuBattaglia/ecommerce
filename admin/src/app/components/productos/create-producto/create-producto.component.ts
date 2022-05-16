import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
  }
  
  registro(registroForm:any){
    if(registroForm.valid){

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
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || 'image/webp' || 'image/jpg' || 'image/jpeg' || 'image/gif'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
        reader.readAsDataURL(file);

        this.file = file;
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class:'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
      });
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
    });
    }
    console.log(this.file);
  }
}
