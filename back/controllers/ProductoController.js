'use strict'

var Producto = require('../models/producto');

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

            res.status(200).send({data:registro});
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

module.exports = {
    registrar_producto_admin,
    listar_productos_admin
}
