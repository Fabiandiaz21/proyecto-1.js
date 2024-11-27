import { Router } from "express";
import { check } from "express-validator";
import httpmovimiento from "../controllers/movimientos.js";
import helperMovimiento from "../helpers/movimientos.js";

const router = Router();

// Crear un nuevo movimiento
router.post("/", [
    // Validaciones generales para el movimiento
    check("tipo", "El tipo de movimiento es obligatorio").notEmpty(),
    check("tipo", "Tipo de movimiento inválido").isIn(['compra', 'venta', 'devolucion_compra', 'devolucion_venta']),
    
    // Validar que 'articulos' es un array y cada artículo tiene los campos necesarios
    check("articulos", "Los artículos son obligatorios").isArray(),
    check("articulos.*.articulo", "El ID del artículo es obligatorio y debe ser un ObjectId").notEmpty().isMongoId(),
    check("articulos.*.cantidad", "La cantidad debe ser un número mayor que 0").isInt({ gt: 0 }),
    check("articulos.*.precio", "El precio debe ser un número mayor que 0").isFloat({ gt: 0 }),

    // Validar valor, iva, y total
    check("valor", "El valor es obligatorio y debe ser un número").isFloat({ gt: 0 }),
    check("iva", "El IVA es obligatorio y debe ser un número").isFloat({ gt: 0 }),
    check("total", "El total es obligatorio y debe ser un número").isFloat({ gt: 0 }),

    // Validar estado (opcional, por defecto es 'aprobado')
    check("estado", "El estado debe ser 'aprobado' o 'anulado'").optional().isIn(['aprobado', 'anulado'])
], httpmovimiento.postmovimiento);

// Modificar un movimiento existente por ID
router.put("/:id", [
    check("id", "El ID del movimiento no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId),

    // Validaciones similares a las de crear movimiento
    check("tipo", "El tipo de movimiento es obligatorio").notEmpty(),
    check("tipo", "Tipo de movimiento inválido").isIn(['compra', 'venta', 'devolucion_compra', 'devolucion_venta']),
    
    // Validación de los artículos en el array
    check("articulos", "Los artículos son obligatorios").isArray(),
    check("articulos.*.articulo", "El ID del artículo es obligatorio y debe ser un ObjectId").notEmpty().isMongoId(),
    check("articulos.*.cantidad", "La cantidad debe ser un número mayor que 0").isInt({ gt: 0 }),
    check("articulos.*.precio", "El precio debe ser un número mayor que 0").isFloat({ gt: 0 }),

    // Validar valor, iva, y total
    check("valor", "El valor es obligatorio y debe ser un número").isFloat({ gt: 0 }),
    check("iva", "El IVA es obligatorio y debe ser un número").isFloat({ gt: 0 }),
    check("total", "El total es obligatorio y debe ser un número").isFloat({ gt: 0 }),

    check("estado", "El estado debe ser 'aprobado' o 'anulado'").optional().isIn(['aprobado', 'anulado'])
], httpmovimiento.putmovimiento);

// Listar todos los movimientos
router.get("/", httpmovimiento.getmovimientos);

// Obtener un movimiento por ID
router.get("/:id", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.getmovimientoById);

// Obtener todos los tipos de movimientos
router.get("/tipos/:tipo", httpmovimiento.getTiposMovimientos);

// Listar movimientos por rango de fechas
router.get("/fecha/:fechaInicio/:fechaFin", httpmovimiento.getListarMovimientosPorFecha);

// Obtener el total vendido
router.get("/total", httpmovimiento.getTotalvendido);

// Activar un movimiento por ID
router.put("/:id/activar", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.putActivar);

// Inactivar un movimiento por ID
router.put("/:id/inactivar", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.putInactivar);

// Obtener movimientos aprobados por ID
router.get("/:id/aprobados", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.getAprobados);

// Obtener movimientos anulados por ID
router.get("/:id/anulados", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.getAnulados);

// Procesar la devolución de una salida por ID
router.put("/:id/devolucionSal", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.putmovimientoDevSal);

// Procesar la devolución de una entrada por ID
router.put("/:id/devolucionEnt", [
    check("id", "El ID no es válido").isMongoId(),
    check("id", "El movimiento no existe").custom(helperMovimiento.validarId)
], httpmovimiento.putmovimientoDevEnt);

export default router;




