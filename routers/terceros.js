import { Router } from "express";
import { check } from "express-validator"; // Agregamos express-validator para validaciones
import httpTerceros from "../controllers/terceros.js";
import helperTerceros from "../helpers/terceros.js";

const router = Router();

// Crear un nuevo tercero
router.post("/", [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("identificacion", "La identificación es obligatoria").notEmpty(),
    check("tipo", "El tipo es obligatorio y debe ser 'cliente' o 'proveedor'").isIn(['cliente', 'proveedor']),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("direccion", "La dirección es obligatoria").notEmpty(),
    check("telefono", "El teléfono es obligatorio").notEmpty(),
    check("estado", "El estado es obligatorio y debe ser 'activo' o 'inactivo'").isIn(['activo', 'inactivo'])
], httpTerceros.postTerceros);

// Modificar un tercero
router.put("/:id", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperTerceros.validarId),
    // Validaciones similares a las de creación
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("identificacion", "La identificación es obligatoria").notEmpty(),
    check("tipo", "El tipo es obligatorio y debe ser 'cliente' o 'proveedor'").isIn(['cliente', 'proveedor']),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("direccion", "La dirección es obligatoria").notEmpty(),
    check("telefono", "El teléfono es obligatorio").notEmpty(),
    check("estado", "El estado es obligatorio y debe ser 'activo' o 'inactivo'").isIn(['activo', 'inactivo'])
], httpTerceros.putTerceros);

// Listar todos los terceros
router.get("/", httpTerceros.getTerceros);

// Obtener tercero por ID
router.get("/:id", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperTerceros.validarId)
], httpTerceros.getTerceroById);

// Activar un tercero por ID
router.put("/:id/activar", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperTerceros.validarId)
], httpTerceros.putActivarTerceros);

// Desactivar un tercero por ID
router.put("/:id/anulados", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperTerceros.validarId)
], httpTerceros.putInactivarTerceros);

// Listar terceros activos
router.get("/:id/aprobados", httpTerceros.getActivos);

// Listar terceros inactivos
router.get("/:id/inactivos", httpTerceros.getAnulados);

// Obtener tipos de terceros
router.get("/tipo", httpTerceros.getTipoTerceros);

export default router;


