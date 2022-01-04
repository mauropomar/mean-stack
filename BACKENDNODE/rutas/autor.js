const express = require('express');
const ruta = express.Router();
const {seguridad} = require('./../middleware/seguridad');
const { crearAutor, updateAutor, deleteAutor, getAutor, getAutorById } = require('../controllers/autor');


ruta
 .route('/')
 .get(seguridad, getAutor)
 .post(seguridad, crearAutor)

 ruta
 .route('/:id')
 .get(seguridad, getAutorById)
 .put(seguridad, updateAutor)
 .delete(seguridad, deleteAutor)
 

 module.exports = ruta;