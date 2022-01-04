var mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
    titulo: {
        required: [true, 'Ingrese un titulo de libro'],
        maxlength: [500, 'El titulo del libro no puede exceder los 500 carácteres.'],
        type: String
    },
    descripcion: String,
    precio: String,
    fechaPublicacion: Date,
    autor: {id: String, nombreCompleto: String}
});

module.exports = mongoose.model('Libro', LibroSchema);