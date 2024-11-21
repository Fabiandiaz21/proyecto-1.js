import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    identificacion:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    telefono:{type:String, required:true},
    estado:{ type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' }
})


export default mongoose.model ("cliente", clienteSchema)