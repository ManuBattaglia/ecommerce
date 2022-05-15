'use strictt'

// DECODIFICAR TOKENS
var jwt = require('jwt-simple')
var moment = require('moment');
// CLAVE PARA CODIFICAR TOKEN
var secret = 'manu';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        mail: user.mail,
        rol: user.rol,
        // FECHA CREACION TOKEN
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload, secret);
}