const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const jwt = require('jsonwebtoken');
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const { UsuarioModel, ComercioModel, PaginaModel } = require("../models")
/**
 * Encargado de registrar un nuevo usuario
 * @param {*} req 
 * @param {*} res 
 */

//----REGISTERED AND PUBLIC USER-----

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} 
        console.log(body)
        const dataUser = await UsuarioModel.create(body)
 
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send(data)

    }catch(err) {

        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const verPaginas = async(req, res)=>{

    try{

        const data = await PaginaModel.find()
        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "LOAD_ERROR")

    }
}

const verPaginasById = async(req, res)=>{

    try{

        const id = req.params.id
        const data = await PaginaModel.findById(id)
        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "LOAD_ERROR")

    }
}

const verPaginasByCiudad = async(req, res)=>{

    try{

        const ciudad = req.params.ciudad
        const data = await PaginaModel.find({ciudad:ciudad})
        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "LOAD_ERROR")

    }
}

const verPaginasByCiudadAndActividad = async(req, res)=>{

    try{

        const ciudad = req.params.ciudad
        const actividad = req.params.actividad
        const data = await PaginaModel.find({ciudad:ciudad, actividad:actividad})

        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "LOAD_ERROR")

    }
}




/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)

        var user

        user = await UsuarioModel.findOne({ email: req.email }).select("password name role email")

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){

        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const updateUser = async (req, res) => {
    try {

        const {id, ...body} = matchedData(req) 
        const data = await UsuarioModel.findByIdAndUpdate(id, body)
        res.send(data)    

    }catch(err){
        console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}

const borrarUsuario = async(req, res) => {

    try{

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = decodedToken._id;

        const data = await UsuarioModel.findByIdAndDelete(id)
        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "LOGOUT_FAILED")

    }
}

const updateUserSelf = async(req, res)=>{

    try{

        const body = matchedData(req)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = decodedToken._id;

        const data = await UsuarioModel.findOneAndUpdate({_id:id}, body)
        res.send(data)

    }catch(err){

        console.error(err)
        handleHttpError(res, "USER_NOT_UPDATED")

    }
}

const valorar = async(req, res) => {

    try{

        const body = matchedData(req)
        const pagina = await PaginaModel.findById(body.id);

        if (!pagina) {
            return res.status(404).json({ error: 'Página no encontrada' });
        }

        pagina.puntuaciones.push({puntuacion: body.puntuacion});
        if(body.resena != null) pagina.resenas.push({resena: body.resena});

        const data = await pagina.save()
        res.send(data)


    }catch(err){

        console.error(err)
        handleHttpError(res, "VALORACION_FAILED")

    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = matchedData(req)
        var data = ""

        data = await UsuarioModel.deleteOne({_id:id})
      
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}

const getUsers = async (req, res) => {

    try {

        var data = ""
        data = await UsuarioModel.find({}) 
        res.send(data)

    } catch (err) {
        console.log(err) 
        handleHttpError(res, 'ERROR_GET_USERS') 
    }
}

const grantUser =  async (req, res) => {

    try {

      const userId = req.params.id;
      const data = await UsuarioModel.updateOne({ _id: userId }, { $set: { role: 'admin' } });
      res.send(data);

    } catch (error) {

      res.send(error);
    }
  }
  
//----COMERCIOS----

const registrarComercio = async(req, res)=>{
    try {
     
        req = matchedData(req);
        console.log(req);
        const body = req;
        const pagina = await PaginaModel.create({})
        body._id = pagina._id
        const dataUser = await ComercioModel.create(body);
        res.send(dataUser);

    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_COMERCIO");
    }
}

const getComercioById = async(req, res) =>{

    try{

        console.log(req.params)
        const userId = req.params.id
        const dataComercio = await ComercioModel.findOne({_id: userId})
        res.send(dataComercio)

    }catch(err){

        console.log(err);
        handleHttpError(res, "COMERCIO_NOT_FOUND")

    }
}

const getComercios = async (req, res) => {

    try {

        const data = await ComercioModel.find({}) 
        res.send(data)

    } catch (err) {
        console.log(err) 
        handleHttpError(res, 'ERROR_GET_COMERCIOS') 
    }
}

const borrarComercio = async (req, res) => {

    try{

        var id = req.params.id
        const data  = [await ComercioModel.deleteOne({_id:id}),await PaginaModel.deleteOne({_id:id})]
        res.send(data)

    }catch(err){

        console.log(err)
        handleHttpError(res, "COMERCIO_NOT_FOUND")

    }
}

module.exports = { registerCtrl, loginCtrl, verPaginas, verPaginasById, verPaginasByCiudad ,verPaginasByCiudadAndActividad,updateUser, updateUserSelf, getUsers, deleteUser, valorar, grantUser, borrarUsuario ,registrarComercio, getComercioById, getComercios, borrarComercio }
