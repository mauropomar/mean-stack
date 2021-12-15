const mongoose = require('mongoose');

const connectDatabase = async ()=>{
    const conexion = await mongoose.connect(process.env.MONGO_DB_LOCAL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log('MongoDb Servidor Conectado', conexion.connection.host);
};

module.exports = connectDatabase;