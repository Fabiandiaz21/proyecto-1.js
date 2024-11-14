import mongoose from "mongoose";
import usuarios from "../models/usuarios.js";
import bcrypt from "bcryptjs"

const httpUsuarios = {
    
    // Crear
    postUsuario: async (req, res) => {
        try {
            const { nombre, email, contraseña, rol, estado } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contraseña, salt);
            
            const usuario = new usuarios({
                nombre,email,contraseña : hashedPassword,rol,estado
            });
            await usuario.save();
            res.json({ usuario });
        } catch (error) {
            res.status(404).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // Login de usuario
    loginUsuario: async (req, res) => {
        try {
            const { email, contraseña } = req.body;

            // Buscar el usuario por su correo electrónico
            const usuario = await usuarios.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // Comparar la contraseña
            const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!isMatch) {
                return res.status(400).json({ error: "Contraseña incorrecta" });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: usuario._id, rol: usuario.rol },
                "tu_secreto_jwt", // Reemplaza esto con una clave secreta en producción
                { expiresIn: "1h" }
            );

            res.json({ mensaje: "Login exitoso", token });
        } catch (error) {
            res.status(500).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // Modificar
    putUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, email, contraseña, rol } = req.body;
            const usuario = await usuarios.findByIdAndUpdate(id, { nombre, email, contraseña, rol}, { new: true });
            res.json({ usuario });
        } catch (error) {
            res.status(404).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // Listar todos
    getUsuarios: async (req, res) => {
        try {
            const usuario = await usuarios.find();
            res.json({ usuario });
        } catch (error) {
            res.status(500).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // Listar por ID
    getUsuarioById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const usuario = await usuarios.findById(id);

            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // Activar
    putActivarUsuario: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const usuario = await usuarios.findByIdAndUpdate(id, { estado: "activo" }, { new: true });
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // Desactivar
    putInactivarUsuario: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const usuario = await usuarios.findByIdAndUpdate(id, { estado: "inactivo" }, { new: true });
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // Lista de usuarios activos
    getActivos: async (req, res) => {
        try {
            const usuario = await usuarios.find({ estado: "activo" });
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // Lista de usuarios inactivos
    getInactivos: async (req, res) => {
        try {
            const usuario = await usuarios.find({ estado: "inactivo" });
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
};

export default httpUsuarios;
