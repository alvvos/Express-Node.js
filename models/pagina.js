const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete")


const PaginaSchema = new mongoose.Schema({
  ciudad: {
    type: String,
    required: false
  },
  actividad: {
    type: String,
    required: false
  },
  titulo: {
    type: String,
    required: false
  },
  resumen: {
    type: String,
    required: false
  },
  textos: {
    type: [],
    required: false
  },
  fotos:{
    type:[],
    required:false
  },
  puntuaciones:{
    type:[],
    required:false
  },
  resenas:{
    type:[],
    required:false
  }
},
{
  timestamps: true, // TODO createdAt, updatedAt
  versionKey: false
});

PaginaSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("paginas", PaginaSchema) 
