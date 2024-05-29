const express = require("express");
const fs = require("fs");
const router = express.Router();

/**
 * Función que elimina la extensión de un nombre de archivo.
 * @param {string} fileName - El nombre del archivo del cual se eliminará la extensión.
 * @returns {string} - El nombre del archivo sin la extensión.
 */
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}


fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file);

    if(name !== 'index') {
 
        router.use('/' + name, require('./'+name)); 
    }
});

module.exports = router;
