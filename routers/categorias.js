import {Router} from "express";
import {helpercategoria} from "../helpers/categorias.js"
import httpcategorias from "../controllers/categorias.js"

const router = Router();

//crear una nueva categoria
router.post("/",[
    check("descripcion","El campo descripcion es obligatorio ").notEmpty(),
    check("estado","el estado es obligatorio").notEmpty()
],httpcategorias.postcategorias);

//modificar una categoria
router.put("/modificar/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","El id no existe").custom(helpercategoria.validarId)
],httpcategorias.putcategorias);

//listar todos 
router.get("/",httpcategorias.getcategorias);

//listar una categoria por ID
router.get("/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","El id no existe").custom(helpercategoria.validarId)
],httpcategorias.getcategoriasById);

//Activar
router.put("/:id/activar",[
    check("id","el id no es valido").isMongoId(),
    check("id","El id no existe").custom(helpercategoria.validarId)
],httpcategorias.putActivarCategorias);

//Desactivar
router.put("/:id/anulados",[
    check("id","el id no es valido").isMongoId(),
    check("id","El id no existe").custom(helpercategoria.validarId)
],httpcategorias.putInactivarCategorias);

//listar activos
router.get("/aprobados/AP", httpcategorias.getActivos);

//listar inactivos
router.get("/inaprobados/INA", httpcategorias.getAnulados)




export default router;