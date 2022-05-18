'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventarioSchema = Schema({
    // VINCULO CAMPO PRODUCTO A COLECCION PRODUCTO
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},
    cantidad: {type: Number, required: true},
    admin: {type: Schema.ObjectId, ref: 'admin', required: true},
    createdAt: {type:Date, default:Date.now, require:true}
});

module.exports =  mongoose.model('inventario',inventarioSchema);