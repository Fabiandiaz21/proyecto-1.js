import {Router} from "express";
import httpcategorias from "../controllers/categorias.js"

const router = Router();

//crear una nueva categoria
router.post("/",httpcategorias.postcategorias);

//modificar una categoria
router.put("/modificar/:id",httpcategorias.putcategorias);

//listar todos 
router.get("/",httpcategorias.getcategorias);

//listar una categoria por ID
router.get("/:id",httpcategorias.getcategoriasById);

//Activar
router.put("/:id/activar",httpcategorias.putActivarCategorias);

//Desactivar
router.put("/:id/anulados",httpcategorias.putInactivarCategorias);

//listar activos
router.get("/aprobados/AP", httpcategorias.getActivos);

//listar inactivos
router.get("/inaprobados/INA", httpcategorias.getAnulados)




export default router;