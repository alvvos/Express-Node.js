const { handleHttpError } = require("../utils/handleError")
/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => { //Doble argumento
    try{
        const {user} = req
        const userRol = user.role
        const checkValueRol = roles.includes(userRol)
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol