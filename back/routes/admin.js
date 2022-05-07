'use strict'

//gestion de rutas cliente
var express = require('express');
var adminController = require('../controllers/AdminController');

var api = express.Router();

//POST porque va a ser un registro
//INICIO CONTROLADOR
api.post('/registro_admin', adminController.registro_admin);

module.exports = api;