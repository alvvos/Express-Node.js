const express = require("express")
const router = express.Router();
const {modificarPagina, publicarPagina, comercioLogin, borrarPagina, subirFoto, subirTexto, getUsersByCity} = require('../controllers/comercio')
const {validatorLoginC} = require('../validators/comercio');
const {validatorRegisterPagina, validatorGetPagina, validatorSubirFoto, validatorTexto} = require('../validators/pagina');
const {validatorCity} = require("../validators/comercio")
const {authMiddlewareC} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const upload = require("../libs/storage")



router.post("/publicarPagina", authMiddlewareC, checkRol(["comercio"]),validatorRegisterPagina, publicarPagina)

router.put("/modificarPagina/:id", authMiddlewareC, checkRol(["comercio"]), validatorGetPagina ,validatorRegisterPagina, modificarPagina)

router.post("/loginComercio", validatorLoginC, comercioLogin)

router.delete("/borrarPagina/:id", authMiddlewareC, checkRol(["comercio"]), validatorGetPagina, borrarPagina)

router.post("/subirFoto", authMiddlewareC, checkRol(["comercio"]),upload.single('foto'),validatorSubirFoto,subirFoto)

router.post("/subirTexto", authMiddlewareC, checkRol(["comercio"]),validatorTexto,subirTexto)

router.get("/buscarUsuarios/:ciudad", authMiddlewareC, checkRol(["comercio"]), validatorCity, getUsersByCity)

module.exports = router
