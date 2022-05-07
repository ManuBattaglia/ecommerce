'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function(req,res){

    var data = req.body;
    var adminArray = [];

    adminArray = await Admin.find({mail:data.mail});

    if(adminArray.length == 0){
        if(data.password){
            //ENCRIPTAR PASS
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var registro = await Admin.create(data);
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

const login_admin = async function(req,res){
    var data = req.body;
    var adminArray = [];

    //  BUSCAR POR CORREO
    adminArray = await Admin.find({mail:data.mail});

    if(adminArray.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }
    else{
        //LOGIN
        let user = adminArray[0];

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

module.exports = {
    registro_admin,
    login_admin
}