import { Router } from "express";
import { check } from "express-validator";
import helperArticulo from "../helpers/ariculos.js";
import httpArticulos from "../controllers/articulos.js";
import ValidarJWTJS from "../Middlewares/Validar-JWT.JS";



const router = Router()

// Crear artículo
router.post('/registrar',[
    
    check("nombre","El campo nombre es obligatorio").notEmpty(),
    check("precio","El campo precio es obligatorio").notEmpty().isNumeric(),
    check("stock","El campo stock es obligatorio").notEmpty().isNumeric(),
    check("categoria","El campo categoria es obligatorio").notEmpty(),
    check("estado","El campo estado es obligatorio").notEmpty()
], httpArticulos.postArticulo);

// Modificar artículo
router.put('/:id',[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperArticulo.validarId)
], httpArticulos.putArticuloM);

// Listar todos los artículos
router.get('/articulo', httpArticulos.getArticulo);

// Listar un artículo por ID
router.get('/articulo/:id',[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperArticulo.validarId)
], httpArticulos.getArticuloById);

// Activar un artículo
router.put('/:id/activar',[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperArticulo.validarId)
], httpArticulos.putActivar);

// Inactivar un artículo
router.put('/:id/inactivar',[
    check("id", "el id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperArticulo.validarId)
], httpArticulos.putInactivar);

// Listar artículos activos
router.get('/activos', httpArticulos.getActivos);

// Listar artículos inactivos
router.get('/inactivos', httpArticulos.getInactivos);




// Obtener el valor total del inventario
router.get('/total-inventario', httpArticulos.getTotalInventario);

// Obtener artículos con categorías
router.get('/categorias', httpArticulos.getArticulosConCategorias);

// Obtener artículos con stock por debajo de un valor X
router.get('/stock-debajo-de/:max',[
    check("stock", "El valor debe ser  numerico ").isNumeric()
], httpArticulos.getArticulosPorStock);

export default router;