const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { UsuarioModel, ComercioModel } = require("../models")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() 
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            retrun
       }

        const user = await UsuarioModel.findOne({ _id: dataToken._id })
         
        req.user = user 

        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const authMiddlewareC = async (req, res, next) => {
    try{

        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() 
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            retrun
       }

        const user = await ComercioModel.findOne({ _id: dataToken._id })
        req.user = user 
        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = {authMiddleware, authMiddlewareC}