import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, required: true,  default: 'usuario' },
    estado: { type: String, required: true,  default: 'activo' }
});

export default mongoose.model("Usuario", usuarioSchema);
