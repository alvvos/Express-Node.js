const { matchedData } = require("express-validator")
const { ComercioModel, PaginaModel, UsuarioModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { tokenSign } = require("../utils/handleJwt")
const jwt = require('jsonwebtoken');
const comercio = require("../models/comercio")

/**
 * Devuelve lista con los comercios.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const findAll = async (req, res) => {
    try {
        // Verifica si se solicita ordenar los comercios por CIF ascendente.
        if (req.query.sort === "cif_asc") {
            sortQuery = { CIF: 1 };
            data = await ComercioModel.find().sort(sortQuery);
        } else {
            data = await ComercioModel.find();
        }
        res.send(data);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_GET_COMERCIOS');
    }
}

/**
 * Guarda un comercio.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */

/**
 * Encuentra un comercio por su CIF.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const findByCif = async (req, res) => {
    const data = await ComercioModel.findOne({ CIF: req.query.cif });
    if (!data) {
        handleHttpError(res, "COMERCIO_NOT_EXIST", 404);
        return;
    }
    res.send(data);
}

/**
 * Modifica un comercio por su CIF.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const modifyByCif = async (req, res) => {
    try {
        
        const body = matchedData(req);
        console.log(`Nuevos datos: ${body}`);
        
        const data = await ComercioModel.findOneAndUpdate({ CIF: req.params.cif }, body);
        res.send(data);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_COMERCIO");
    }
}

/**
 * Elimina un comercio por su CIF.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const deleteByCif = async (req, res) => {
    try {
   
        if (req.query.fisico === true) {
            const { cif } = matchedData(req);
            const data = await ComercioModel.deleteOne({ CIF: cif });
            res.send(data);
        } else {
            const { cif } = matchedData(req);
        
            const data = await ComercioModel.updateOne(
                { CIF: cif },
                { $set: { Eliminado: true } }
            );
            res.send(data);
        }
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_COMERCIO');
    }
}

const comercioLogin = async(req, res) => {

    try {

        req = matchedData(req)
        var comercio
        comercio = await ComercioModel.findOne({ email: req.email }).select("email cif role")
        console.log(comercio)
        if(!comercio){
            handleHttpError(res, "COMERCIO_NOT_EXISTS", 404)
            return
        }
        
        const data = {
            token: await tokenSign(comercio),
            comercio
        }

        res.send(data)

    }catch(err){

        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_COMERCIO")
    }
}

//------PÁGINAS------

/**
 * Elimina un comercio por su CIF.
 * @param {*} req - Contenido nuevo para la página.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const modificarPagina = async(req, res) => {

    try {
        const body = matchedData(req);
        console.log(`Nuevos datos: ${body}`);
        const data = await PaginaModel.findOneAndUpdate({_id: body.id}, body);
        res.send(data);

    } catch (err) {

        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_COMERCIO");

    }
}

/**
 * Elimina un comercio por su CIF.
 * @param {*} req - Contenido para rellenar la página vacia.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const publicarPagina = async (req, res) => {
    try {
       
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = decodedToken._id;
        const body = req.body;
        body._id = id;
        const nuevaPagina = await PaginaModel.create(body);
        res.send(nuevaPagina);

    } catch (error) {
        console.error("Error al publicar la página:", error);
        handleHttpError(res, "ERROR_REGISTER_PAGINA");
    }
};

const borrarPagina = async (req, res) => {

    try{

        if (!req) {
            return res.status(400).json({ error: 'No se ha especificado ningún id' });
        }
        var id = req.params.id
        const data  = [await PaginaModel.deleteOne({_id:id}),await PaginaModel.deleteOne({_id:id})]
        res.send(data)

    }catch(err){

        console.log(err)
        handleHttpError(res, "PAGINA_NOT_FOUND")

    }
}

const subirFoto = async (req, res) => {
    try {
      
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
        }

        const fotoSubida = matchedData(req.file);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = decodedToken._id;
        const pagina = await PaginaModel.findById(id);

        if (!pagina) {
            return res.status(404).json({ error: 'Página no encontrada' });
        }

        pagina.fotos.push({
            nombre: fotoSubida.filename,
            ruta: fotoSubida.path
        });

        await pagina.save();

        res.json({ mensaje: 'Foto subida correctamente', foto: pagina.fotos });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const subirTexto = async(req, res) =>{

    try{

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = decodedToken._id;
        const pagina = await PaginaModel.findById(id);

        const texto = matchedData(req)
        pagina.textos.push({texto})
        await pagina.save()

        res.json({ mensaje: 'Texto subido correctamente'});

    }
    catch (error) {

        res.status(500).json({ error: error.message });
    }

}

const getUsersByCity = async(req, res)=>{

    try{

        const ciudad = req.params.ciudad
        const users = await UsuarioModel.find({ ciudad: ciudad, recibirOfertas: true });

        res.send(users)

    }catch(err){

        console.error(err)
        handleHttpError(res, 'ERROR_GET_USUARIOS');        
    }
}

module.exports = { findAll, publicarPagina, modificarPagina,findByCif, modifyByCif, deleteByCif, comercioLogin, borrarPagina, subirFoto, subirTexto, getUsersByCity };
