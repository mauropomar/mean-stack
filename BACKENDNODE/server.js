const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const libro = require('./rutas/libro');

dotenv.config({path:'./config/config.env'});

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use('/api/Libro', libro);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV));