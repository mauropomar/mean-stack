const ErrorResponse = require("./../helper/errorResponse");
const Usuario = require("../models/Usuario");

exports.registrarUsuario = async (req, res, next) => {
    try {
        const { nombre, apellido, username, email, password } = req.body;
        const usrBD = await Usuario.create({
            nombre,
            apellido,
            userName: username,
            email,
            password,
        });
        const token = usrBD.crearJsonWebToken();
        res.status(200).json({
            status: 200,
            id: usrBD.id,
            nombre,
            apellido,
            username,
            email,
            token,
        });
    } catch (error) {
        next(new ErrorResponse("No es posible registrar un usuario " + error.message, 404));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse("Ingrese un email y un password.", 400));
        }
        const usuarioBD = await Usuario.findOne({ email }).select("+password");
        if (!usuarioBD) {
            return next(
                new ErrorResponse("El usuario no existe en la base de datos.", 400)
            );
        }
        const valBool = await usuarioBD.validarPassword(password);
        if (!valBool) {
            return next(new ErrorResponse("Las credenciales son incorrectas.", 400));
        }
        const token = usuarioBD.crearJsonWebToken();
        res.status(200).json({
            status: 200,
            id: usuarioBD.id,
            nombre: usuarioBD.nombre,
            apellido: usuarioBD.apellido,
            username: usuarioBD.userName,
            email: usuarioBD.email,
            token: token
        });
    } catch (error) {
        next(new ErrorResponse("Error en el login " + error.message, 404));
    }
};

exports.getUsuario = (req, res, next) => {
    res.status(200).json({ status: 200 });
};
