const mongoose = require("mongoose");
const bycript = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor ingrese un nombre."],
  },
  apellido: {
    type: String,
    required: [true, "Por favor ingrese un apellido."],
  },
  userName: {
    type: String,
    required: [true, "Por favor ingrese un username."],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email."],
    unique: true,
    match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, "Ingrese un email valido"],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese una contraseña."],
    minlength:6,
    select: false
  }
});

UsuarioSchema.pre("save", async function(next){
   const salt = await bycript.genSalt(10);
   this.password = await bycript.hash(this.password, salt);
});

UsuarioSchema.methods.crearJsonWebToken = function(){
   return jwt.sign({username:this.userName}, process.env.JWT_SECRET_WORD, {
        expiresIn:process.env.JWT_EXPIRE
    });
}

UsuarioSchema.methods.validarPassword = async function(passwordUsuario){
   return await bycript.compare(passwordUsuario, this.password)
}

module.exports = mongoose.model('Usuario', UsuarioSchema);
