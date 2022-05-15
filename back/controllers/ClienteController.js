'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function(req,res){

    var data = req.body;
    var clientesArray = [];

    clientesArray = await Cliente.find({mail:data.mail});

    if(clientesArray.length == 0){
        if(data.password){
            //ENCRIPTAR PASS
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var registro = await Cliente.create(data);
                    res.status(200).send({data:registro});
                }else{
                    // SI NO HAY PASS ENCRIPTADA
                    res.status(200).send({message:'ErrorServer',data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña',data:undefined});
        }
    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});
    }
}

const login_cliente = async function(req,res){
    var data = req.body;
    var clienteArray = [];

    //  BUSCAR POR CORREO
    clienteArray = await Cliente.find({mail:data.mail});

    if(clienteArray.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }
    else{
        //LOGIN
        let user = clienteArray[0];
        // console.log(user);
        // res.status(200).send({data:user});
        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)                
                });
            }
            else{
                res.status(200).send({message: "La contraseña no coincide", data: undefined});
            }
        });
        
    } 
}

// por req recibo objeto decodificado
const listar_clientes_filtro_admin = async function(req,res){
    console.log(req.user);
    if(req.user){
        // VERIFICAR QUE SOLO ADMIN PUEDAN ACCEDER
        if(req.user.rol == 'admin'){
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];

            console.log(tipo)

            if(tipo == null || tipo == 'null'){
                let registros = await Cliente.find();
                res.status(200).send({data:registros});
            }else{
                // PUEDE SER APELLIDO EN MIN
                if(tipo == 'apellido'){
                    let registros = await Cliente.find({apellido: new RegExp(filtro, 'i')});
                    res.status(200).send({data:registros});
                }else if(tipo == 'correo'){
                    let registros = await Cliente.find({mail: new RegExp(filtro, 'i')});
                    res.status(200).send({data:registros});
                }       
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var data = req.body;

            // LE PASO UNA CONTRASEÑA POR DEFECTO AL USUARIO
            bcrypt.hash('123456789', null,null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'Hubo un error en el servidor',data:undefined});
                }
            })
        }
    }
}


module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin
}
