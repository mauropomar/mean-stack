const express = require('express');
const ruta = express.Router();

const { crearAutor, updateAutor, deleteAutor, getAutor, getAutorById } = require('../controllers/autor');

ruta
 .route('/')
 .get(getAutor)
 .post(crearAutor)

 ruta
 .route('/:id')
 .get(getAutorById)
 .put(updateAutor)
 .delete(deleteAutor)
 

 module.exports = ruta;