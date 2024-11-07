import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    estado: { type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' } // 1:activo -- 0:inactivo
});

export {categoriaSchema}
