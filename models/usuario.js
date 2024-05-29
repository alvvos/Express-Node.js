const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete")


const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  intereses: {
    type: Array,
    required: true
  },
  recibirOfertas:{
    type:Boolean,
    default:true
  },
  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
},
{
  timestamps: true, 
  versionKey: false
});

UsuarioSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("usuarios", UsuarioSchema) 
