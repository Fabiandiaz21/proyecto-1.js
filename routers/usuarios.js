import { Router } from "express";
import { check } from "express-validator";
import httpUsuarios from "../controllers/usuarios.js";
import {validarJWT} from "../Middlewares/ValidarJWT.js"
import  validarcampos  from "../Middlewares/validar.js"
import helperUsuario from "../helpers/usuarios.js";

const router = Router();

// Crear un nuevo usuario
router.post("/",[
    check("nombre","El campo nombre es obligatorio").notEmpty(),
    check("email","El campo email es obligatorio").notEmpty().isEmail(),
    check("contraseña","El campo contraseña es obligatorio").notEmpty().isLength({ min: 8 }),
    check("rol","El campo rol es obligatorio").notEmpty(),
    check("estado","El campo estado es obligatorio").notEmpty(),
    validarcampos
], httpUsuarios.postUsuario);

// Ruta para el inicio de sesión de usuario
router.post("/login",[
], httpUsuarios.loginUsuario);

// Modificar un usuario
router.put("/modificar/:id",[
    check("id", "El id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperUsuario.validarId)
], httpUsuarios.putUsuario);

// Listar todos los usuarios
router.get("/usuario",[
    validarJWT,
    check("nombre","El campo nombre es obligatorio").notEmpty(),
    check("email","El campo email es obligatorio").notEmpty().isEmail(),
    check("contraseña","El campo contraseña es obligatorio").notEmpty().isLength({ min: 8 }),
],httpUsuarios.getUsuarios);

// Listar un usuario por ID
router.get("/:id",[ 
    check("id", "El id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperUsuario.validarId)
], httpUsuarios.getUsuarioById);

// Activar un usuario
router.put("/:id/activar",[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperUsuario.validarId)
], httpUsuarios.putActivarUsuario);

// Desactivar un usuario
router.put("/:id/inactivar",[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperUsuario.validarId)
], httpUsuarios.putInactivarUsuario);

// Listar usuarios activos
router.get("/activos/A", httpUsuarios.getActivos);

// Listar usuarios inactivos
router.get("/inactivos/I", httpUsuarios.getInactivos);

export default router;
