import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema({
    nombre:{type:String, required:true}, //precio pp
    precio: {type:Number, required:true},
    categoria:{type:mongoose.Schema.Types.ObjectId,ref:'categoria',required:true, },
    stock: { type:Number, required:true},
    estado:{ type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' }// 1:activo -- 0:inactivo
})

export default mongoose.model('Articulo',articuloSchema); 