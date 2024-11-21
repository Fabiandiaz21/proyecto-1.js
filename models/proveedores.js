import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    identificacion:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    direccion:{type:String, required:true},
    telefono:{type:String, required:true},
    estado:{ type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' }// 1:activo -- 0:inactivo
})


export default mongoose.model ("proveedores", proveedorSchema)