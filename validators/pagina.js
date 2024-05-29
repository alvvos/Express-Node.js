const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Validadores para el CRUD de páginas.
 */
const validatorRegisterPagina = [

    check("ciudad").exists().notEmpty().matches(/^[\sa-zA-Z]+$/, "i"),
    check("actividad").exists().notEmpty().matches(/^[\sa-zA-Z]+$/, "i"),
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists(),
    check("fotos").exists(),
    check("puntuaciones").exists().isNumeric(),
    check("resenas").exists(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetPagina = [
   
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorSubirFoto = [
    check('foto').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes proporcionar una imagen');
        }

        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!tiposPermitidos.includes(req.file.mimetype)) {
            throw new Error('Formato de archivo no admitido');
        }

        const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
        if (req.file.size > maxSize) {
            throw new Error('El tamaño del archivo es demasiado grande');
        }

    }),
    (req, res, next) => {
        return validateResults(req, res, next);        
    }
];

const validatorTexto = [

    check("textos").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];



module.exports = { validatorRegisterPagina, validatorGetPagina, validatorSubirFoto, validatorTexto };
