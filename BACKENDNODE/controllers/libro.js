const ErrorResponse = require('./../helper/errorResponse');
const Libro = require("../models/Libro")

exports.getLibros = async (req, res, next) => {
    try {
        const libroLista = await Libro.find();
        res.status(200).json(libroLista);
    } catch (error) {
        next(new ErrorResponse('No es posible procesar la respuesta ' + error.message, 404));
    }
}

exports.getLibroById = async (req, res, next) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return next(new ErrorResponse('El libro no existe con este id ' + req.params.id, 404));
        }
        res.status(200).json(libro);
    } catch (error) {
        next(new ErrorResponse('El libro no existe con este id ' + req.params.id, 404));
    }
}

exports.crearLibro = async (req, res, next) => {
    try {
        const libroData = await Libro.create(req.body);
        res.status(200).json({
            status: 200,
            data: libroData
        });
    } catch (error) {
        next(new ErrorResponse('No es posible crear un libro ' + error.message, 404));
    }
}

exports.updateLibro = async (req, res, next) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body);
        if (!libro) {
            return next(new ErrorResponse('El libro no existe con este id ' + req.params.id, 404));
        }
        res.status(200).json({ status: 200, data: libro });
    } catch (error) {
        next(new ErrorResponse('Ha ocurrido un error al actualizar el libro ' + error.message, 404));
    }
}

exports.deleteLibro = async (req, res, next) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);
        if (!libro) {
            return next(new ErrorResponse('El libro no existe con este id ' + req.params.id, 404));
        }
        res.status(200).json({ status: 200 });
    } catch (error) {
        next(new ErrorResponse('Ha ocurrido un error al eliminar el libro ' + error.message, 404));
    }
}

exports.pagination = async (req, res, next) => {
    try {
        const sort = req.body.sort;
        const sortDirection = req.body.sortDirection;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        let filterValor = "";
        let filterPropiedad = "";
        let libros = "";
        let totalRows = 0;
        if (req.body.filterValue) {
            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;
            libros = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, 'i')
            })
                .sort({ [sort]: sortDirection })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
            totalRows = await Libro.find({ [filterPropiedad]: new RegExp(filterValor, 'i') }).count();
        } else {
            libros = await Libro.find()
                .sort({ [sort]: sortDirection })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRows = await Libro.find().count();
        }
        const pageQuantity = Math.ceil(totalRows / pageSize);
        res.status(200).json({
            status: 200,
            pageSize,
            sort,
            sortDirection,
            pageQuantity,
            totalRows,
            data: libros
        })
    } catch (error) {
        next(new ErrorResponse('No es posible procesar la respuesta ' + error.message, 404));
    }
}