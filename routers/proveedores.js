import { Router } from "express";
import { check } from "express-validator";
import httpProveedores from "../controllers/proveedores.js";
import helperProveedor from "../helpers/proveedores.js";


const router = Router();

// Crear un nuevo tercero
router.post("/PS", [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("identificacion", "La identificación es obligatoria").notEmpty(),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("direccion", "La direccion es obligatoria").notEmpty(),
    check("telefono", "El teléfono es obligatorio").notEmpty(),
    check("estado", "El estado es obligatorio y debe ser 'activo' o 'inactivo'").isIn(['activo', 'inactivo'])
], httpProveedores.postProveedores);

// Modificar un tercero
router.put("/modificar/:id", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperProveedor.validarId),
], httpProveedores.putProveedores);

// Listar todos los terceros
router.get("/", httpProveedores.getProveedores);

// Obtener tercero por ID
router.get("/:id", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperProveedor.validarId)
], httpProveedores.gatProveedorByid);

// Activar un tercero por ID
router.put("/:id/activar", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperProveedor.validarId)
], httpProveedores.putActivarProveedor);

// Desactivar un tercero por ID
router.put("/:id/anulados", [
    check("id", "El id no es válido").isMongoId(),
    check("id", "El tercero no existe").custom(helperProveedor.validarId)
], httpProveedores.putInactivarProveedor);

// Listar terceros activos
router.get("/:id/aprobados", httpProveedores.getActivos);

// Listar terceros inactivos
router.get("/:id/inactivos", httpProveedores.getAnulados);

export default router;