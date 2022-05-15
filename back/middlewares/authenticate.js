'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
// CLAVE PARA DECODIFICAR
var secret = 'manu'; 

// VERIFICAR TOKEN
exports.auth = function(req, res, next){
    // console.log(req.headers);

    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeadersError'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    // DIVIDIR TOKEN 
    var segment = token.split('.');

    // console.log(token);
    // console.log(segment);
    
    if(segment.length != 3){
        return res.status(403).send({message: 'Invalid Token'});
    }else{
        try {
            var payload = jwt.decode(token, secret);
            // console.log(payload);
            // EVALUAR EXPIRACION TOKEN
            if(payload.exp <= moment.unix){
                return res.status(403).send({message: 'El token expiro'});
            }
        } catch (error) {
            return res.status(403).send({message: 'Invalid Token'});
        }
    }

    req.user = payload;

    next();
}