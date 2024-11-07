import {Router} from "express";
import httpTerceros from "../controllers/terceros.js";

const router =Router();

// Crear un nuevo tercero
router.post("/", httpTerceros.postTerceros);

// Modificar un tercero 
router.put("/", httpTerceros.putTerceros);

//listar todos los terceros
router.get("/", httpTerceros.getTerceros);

// Obtener terceros por ID
router.get("/:id", httpTerceros.gatTercerosByid);

//Activar
router.put("/:id/activar",httpTerceros.putActivarTerceros);

//Desactivar
router.put("/:id/anulados",httpTerceros.putInactivarTerceros);

//listar activos
router.get("/:id/aprobados", httpTerceros.getActivos);

//listar inactivos
router.get("/:id/inactivos", httpTerceros.getAnulados);

//tipo
router.get("/tipo",httpTerceros.getTipoTerceros);


export default router;

