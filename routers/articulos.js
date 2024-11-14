import { Router } from "express";
import httpArticulos from "../controllers/articulos.js";


const router = Router()

// Crear artículo
router.post('/registrar', httpArticulos.postArticulo);

// Modificar artículo
router.put('/:id', httpArticulos.putArticuloM);

// Listar todos los artículos
router.get('/articulo', httpArticulos.getArticulo);

// Listar un artículo por ID
router.get('/articulo/:id', httpArticulos.getArticuloById);

// Activar un artículo
router.put('/:id/activar', httpArticulos.putActivar);

// Inactivar un artículo
router.put('/:id/inactivar', httpArticulos.putInactivar);

// Listar artículos activos
router.get('/activos', httpArticulos.getActivos);

// Listar artículos inactivos
router.get('/inactivos', httpArticulos.getInactivos);




// Obtener el valor total del inventario
router.get('/total-inventario', httpArticulos.getTotalInventario);

// Obtener artículos con categorías
router.get('/categorias', httpArticulos.getArticulosConCategorias);

// Obtener artículos con stock por debajo de un valor X
router.get('/stock-debajo-de/:max', httpArticulos.getArticulosPorStock);

export default router;