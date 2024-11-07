import { Router } from "express";
import httpmovimiento from "../controllers/movimientos.js"


const router = Router()


// Crear un nuevo movimiento
router.post("/", httpmovimiento.postmovimiento);

// Modificar un movimiento existente por ID
router.put("/:id", httpmovimiento.putmovimiento);

// Listar todos los movimientos
router.get("/", httpmovimiento.getmovimientos);

// Obtener un movimiento por ID
router.get("/:id", httpmovimiento.getmovimientoById);  

// Obtener todos los tipos de movimientos
router.get("/tipo", httpmovimiento.getTiposMovimientos);

// Listar movimientos por rango de fechas
router.get("/fecha/:fechaInicio/:fechaFin", httpmovimiento.getListarMovimientosPorFecha);

// Obtener el total vendido
router.get("/total", httpmovimiento.getTotalvendido);

// Activar un movimiento por ID
router.put("/:id/activar", httpmovimiento.putActivar);

// Inactivar un movimiento por ID
router.put("/:id/inactivar", httpmovimiento.putInactivar);

// Obtener movimientos aprobados por ID
router.get("/:id/aprobados", httpmovimiento.getAprobados);

// Obtener movimientos anulados por ID
router.get("/:id/anulados", httpmovimiento.getAnulados); 

// Procesar la devolución de una salida por ID
router.put("/:id/devolucionSal", httpmovimiento.putmovimientoDevSal);

// Procesar la devolución de una entrada por ID
router.put("/:id/devolucionEnt", httpmovimiento.putmovimientoDevEnt);


export default router



