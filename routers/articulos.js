import { Router } from "express";
import httpArticulos from "../controllers/articulos.js";


const router = Router()

// Crear artículo
router.post('/', httpArticulos.postArticulo);

// Modificar artículo
router.put('/:id', httpArticulos.putArticulo);

// Listar todos los artículos
router.get('/', httpArticulos.getArticulo);

// Listar un artículo por ID
router.get('/:id', httpArticulos.getArticuloById);

// Activar un artículo
router.put('/activar/:id', httpArticulos.putActivar);

// Inactivar un artículo
router.put('/inactivar/:id', httpArticulos.putInactivar);

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