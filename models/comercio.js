const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete")


const ComercioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  cif: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  id:{
    type:Number,
    required:true,
    unique:true
  },
  eliminado:{
    type:Boolean,
    default:false
  },
  role:{
    type: String,
    enum: ["comercio"],
    default: "comercio"
  }
},
{
  timestamps: true, // TODO createdAt, updatedAt
  versionKey: false
});

ComercioSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercios", ComercioSchema) 
