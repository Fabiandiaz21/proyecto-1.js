import mongoose from "mongoose";

const terceroSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    identificacion:{type:String, required:true},
    tipo:{type:String, require: true},// 1: cliente , 2:proveedor
    email:{type:String, required:true, unique:true},
    direccion:{type:String, required:true},
    telefono:{type:String, required:true},
    estado:{ type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' }// 1:activo -- 0:inactivo
})


export default mongoose.model ("terceros", terceroSchema)