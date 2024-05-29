const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

/**
 * Validadores para el CRUD de admins.
 */
const validatorRegister = [
    check("nombre").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("edad").exists().notEmpty().isNumeric(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 64} ),
    check("ciudad").exists().notEmpty(),
    check("intereses").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUser = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCity = [

    check("ciudad").exists().notEmpty().matches(/^[\sa-zA-Z]+$/, "i"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }

]

const validatorCityAndActivity = [

    check("ciudad").exists().notEmpty().matches(/^[\sa-zA-Z]+$/, "i"),
    check("actividad").exists().notEmpty().matches(/^[\sa-zA-Z]+$/, "i"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }

]

const validatorUpdate = [
    check("nombre").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("edad").exists().notEmpty().isNumeric(), //Puedes aplicarle un min y max también al número
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 64} ),
    check("role").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorValoracion = [

    check("puntuacion").exists().notEmpty().isNumeric().isIn([1, 2, 3, 4, 5]),
    check("resena").notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister,validatorCity ,validatorCityAndActivity,validatorLogin, validatorGetUser, validatorUpdate, validatorValoracion }