import { Router } from "express";
import httpUsuarios from "../controllers/usuarios.js";

const router = Router();

// Crear un nuevo usuario
router.post("/", httpUsuarios.postUsuario);

// Ruta para el inicio de sesión de usuario
router.post("/login", httpUsuarios.loginUsuario);

// Modificar un usuario
router.put("/modificar/:id", httpUsuarios.putUsuario);

// Listar todos los usuarios
router.get("/", httpUsuarios.getUsuarios);

// Listar un usuario por ID
router.get("/:id", httpUsuarios.getUsuarioById);

// Activar un usuario
router.put("/:id/activar", httpUsuarios.putActivarUsuario);

// Desactivar un usuario
router.put("/:id/inactivar", httpUsuarios.putInactivarUsuario);

// Listar usuarios activos
router.get("/activos", httpUsuarios.getActivos);

// Listar usuarios inactivos
router.get("/inactivos", httpUsuarios.getInactivos);

export default router;
