'use strict'

//gestion de rutas cliente
var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

//POST porque va a ser un registro
//INICIO CONTROLADOR
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);

module.exports = api;