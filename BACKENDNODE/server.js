const dotenv = require('dotenv');
const express = require('express');

dotenv.config({path:'./config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV));