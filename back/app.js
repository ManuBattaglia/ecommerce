'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();

var cliente_routes = require('./routes/cliente');
var admin_routes = require('./routes/admin');
var producto_routes = require('./routes/producto');
mongoose.connect('mongodb://127.0.0.1:27017/tienda', (err, res) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor corriendo');
        app.listen(port, function(){
            console.log('Servidor corriendo en el puerto ' + port)
        });
    }
})


//ANALIZAR CUERPO PETICIONES
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

//PERMISOS PARA ENVIAR DATA FRONT BACK
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_routes);
app.use('/api',admin_routes);
app.use('/api', producto_routes)

module.exports = app;