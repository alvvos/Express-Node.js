const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Validadores para el CRUD de comercios.
 */
const validatorRegisterC = [
    check("nombre").exists().notEmpty().isLength({ min: 0, max: 99 }),
    check("cif").exists().notEmpty(), 
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("telefono").exists().notEmpty().isLength({ min: 0, max: 15 }).matches(/^[0-9]+$/),
    check("id").exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorCif = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetComercio = [
    (req, res, next) => {
        
        if (!req.params.id) {
            return res.status(400).json({ error: "El parámetro 'id' es obligatorio" });
        }
        next(); 
    },
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateC = [
    check("nombre").exists().notEmpty().isLength({ min: 0, max: 99 }),
    check("cif").exists().notEmpty(), 
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("telefono").exists().notEmpty().isLength({ min: 0, max: 15 }),
    check("id").exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLoginC = [

    check("email").exists().notEmpty().isEmail(),
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorCity = [

    check("ciudad").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }

]

module.exports = { validatorRegisterC, validatorCif, validatorCity, validatorUpdateC, validatorGetComercio, validatorLoginC };
