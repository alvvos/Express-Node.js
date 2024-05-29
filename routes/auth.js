const express = require("express")
const { registerCtrl, loginCtrl, verPaginas,verPaginasById,verPaginasByCiudad,updateUser,updateUserSelf ,getUsers, deleteUser, grantUser,registrarComercio, borrarUsuario, valorar,getComercioById, getComercios, borrarComercio, getPaginas, verPaginasByCiudadAndActividad } = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorGetUser, validatorUpdate, validatorValoracion,validatorCity, validatorCityAndActivity} = require("../validators/auth")
const {validatorRegisterC,validatorUpdateC, validatorGetComercio} = require("../validators/comercio")
const {authMiddleware} = require("../middleware/session")
const checkRol = require("../middleware/rol")
const { check } = require("express-validator")
const { validatorGetPagina } = require("../validators/pagina")
const router = express.Router()

//----REGISTERED AND PUBLIC USERS----
router.post("/register", validatorRegister, registerCtrl)

router.post("/login", validatorLogin, loginCtrl) 

router.get("/paginas", verPaginas)

router.get("/paginas-id/:id", verPaginasById)

router.get("/paginas-ciudad/:ciudad", validatorCity,verPaginasByCiudad)

router.get("/paginas-ciudad-actividad/:ciudad/:actividad", validatorCityAndActivity,verPaginasByCiudadAndActividad)

router.put("/updateSelf", authMiddleware, checkRol(["user"]), validatorUpdate, updateUserSelf)

router.delete("/borrar", authMiddleware, checkRol(["user"]), borrarUsuario)

router.patch("/valorar/:id", authMiddleware, checkRol(["user"]), validatorGetPagina, validatorValoracion, valorar)

//----ADMINS----
router.get("/users", authMiddleware, checkRol(["admin"]), getUsers)

router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser)

router.delete("/users/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, deleteUser)

router.patch("/grant/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, grantUser)

router.post("/registrarComercio", authMiddleware, checkRol(["admin"]), validatorRegisterC, registrarComercio)

router.get("/consultarComercio/:id", authMiddleware,checkRol(["admin"]), validatorGetComercio, getComercioById)

router.get("/consultarComercios", authMiddleware,checkRol(["admin"]), getComercios)

router.delete("/borrarComercio/:id", authMiddleware, checkRol(["admin"]), validatorGetComercio, borrarComercio )

module.exports = router  
