import {Router} from "express";
import httpcategorias from "../controllers/categorias.js"

const router = Router();

//crear una nueva categoria
router.post("/",httpcategorias.postcategorias);

//modificar una categoria
router.put("/",httpcategorias.putcategorias);

//listar todos 
router.get("/",httpcategorias.getcategorias);

//listar una categoria por ID
router.get("/:id",httpcategorias.getcategoriasById);

//Activar
router.put("/:id/activar",httpcategorias.putActivarCategorias);

//Desactivar
router.put("/:id/anulados",httpcategorias.putInactivarCategorias);

//listar activos
router.get("/:id/aprobados", httpcategorias.getActivos);

//listar inactivos
router.get("/:id/inactivos", httpcategorias.getAnulados)




export default router;