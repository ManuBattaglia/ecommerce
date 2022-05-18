'use strict'

var Producto = require('../models/producto');
var Inventario = require('../models/inventario');
var fs = require('fs');
var path = require('path');

const registrar_producto_admin = async function(req,res){

    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;
            console.log(data);
            console.log(req.files);
            
            var img_path = req.files.portada.path;
            var name = img_path.split('\\') 
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portada_name;
            let registro = await Producto.create(data);
            console.log(registro)

            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                // EN REGISTRO TENGO TODO EL PRODUCTO
                producto: registro._id,
            });

            res.status(200).send({data:registro, inventario: inventario});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_productos_admin = async function(req,res){

    if(req.user){
        if(req.user.rol == 'admin'){

            var filtro = req.params['filtro'];
            let registros = await Producto.find({titulo:new RegExp(filtro, 'i')});
            res.status(200).send({data:registros})
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_portada = async function(req,res){

    var img = req.params['img'];
    console.log(img);
    fs.stat('./uploads/productos/'+img, function(err){
        if(!err){
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const obtener_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            
            var id = req.params['id'];
            
            try {
                var registro = await Producto.findById({_id:id});
                res.status(200).send({data:registro});
            } catch (error) {
                res.status(200).send({data:undefined});
            }
            // VALIDAR REGISTRO


        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualizar_producto_admin = async function(req,res){

    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;
            let id = req.params['id'];
            // console.log(data);
            // console.log(req.files);
            
            // VALIDAR SI PASO IMG
            if(req.files){
                // SI HAY IMG
                var img_path = req.files.portada.path;
                var name = img_path.split('\\') 
                var portada_name = name[2];

                // console.log('Si hay img')
                let registros = await Producto.findByIdAndUpdate({_id:id}, {
                    titulo:data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    portada: portada_name,
                });

                // AL ACTUALIZAR PRODUCTO EN registros SE GUARDA TODO EL OBJETO DEL PRODUCTO QUE SE ACTUALIZO
                fs.stat('./uploads/productos/'+registros.portada, function(err){
                    // SI NO HAY Error, ELIMINO
                    if(!err){
                        fs.unlink('./uploads/productos/'+registros.portada, (ERR)=>{
                            if(err) throw err;
                        })
                    };
                })

                res.status(200).send({data:registros})

            }else{
                // NO HAY IMG
                let registros = await Producto.findByIdAndUpdate({_id:id}, {
                    titulo:data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                });
                res.status(200).send({data:registros})
               
            }

            // res.status(200).send({data:registro});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            
           var id = req.params['id'];
            // BUSCO Y ELIMINO POR ID
           let registro = await Producto.findByIdAndRemove({_id:id});
           res.status(200).send({data:registro});
            
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_inventario_producto_admin = async function(req, res){
    
    if(req.user){
        if(req.user.rol == 'admin'){
            
            var id = req.params['id'];
            // POPULATE ES COMO JOIN EN SQL
            var registro = await Inventario.find({producto: id}).populate('admin').sort({createdAt: -1});
            res.status(200).send({data:registro})

        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_inventario_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            
            let data = req.body;
            let registro = await Inventario.create(data);

            // OBTENER EL REGISTRO DE PRODUCTO
            let prod = await Producto.findById({_id:registro.producto});
            // CALCULO NUEVO STOCK 
                                //STOCK ACTUAL          //STOCK A AUMENTAR
            let nuevo_stock = parseInt(prod.stock) + parseInt(registro.cantidad)
            // AUTENTICACION DEL NUEVO STOCK AL PRODUCTO
            let producto = await Producto.findByIdAndUpdate({_id:registro.producto},{
                stock: nuevo_stock
            })
                

            res.status(200).send({data:registro})

        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    registrar_producto_admin,
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    registro_inventario_producto_admin
}
