import { Router } from "express";
import { check } from "express-validator";
import httpcliente from "../controllers/cliente.js";
import helperCliente from "../helpers/cliente.js";


const router = Router();

// Crear un nuevo tercero
router.post("/", [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("identificacion", "La identificación es obligatoria").notEmpty(),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("telefono", "El teléfono es obligatorio").notEmpty(),
    check("estado", "El estado es obligatorio y debe ser 'activo' o 'inactivo'").isIn(['activo', 'inactivo'])
], httpcliente.postCliente);

// Modificar un tercero
router.put("/:id", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperCliente.validarId),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("identificacion", "La identificación es obligatoria").notEmpty(),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("telefono", "El teléfono es obligatorio").notEmpty(),
    check("estado", "El estado es obligatorio y debe ser 'activo' o 'inactivo'").isIn(['activo', 'inactivo'])
], httpcliente.putCliente);

// Listar todos los terceros
router.get("/", httpcliente.getCliente);



// Activar un tercero por ID
router.put("/:id/activar", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperCliente.validarId)
], httpcliente.putActivarCliente);

// Desactivar un tercero por ID
router.put("/:id/anulados", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperCliente.validarId)
], httpcliente.putInactivarcliente);

// Listar terceros activos
router.get("/activos/AT", httpcliente.getActivos);

// Listar terceros inactivos
router.get("/inactivos/IN", httpcliente.getAnulados);

export default router;


