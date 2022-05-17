'use strict'

var express = require('express');
var productoController = require('../controllers/ProductoController');

var api = express.Router();
var auth = require('../middlewares/authenticate')
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

api.post('/registrar_producto_admin', [auth.auth, path], productoController.registrar_producto_admin);
api.get('/listar_productos_admin/:filtro?', auth.auth, productoController.listar_productos_admin);

module.exports = api;