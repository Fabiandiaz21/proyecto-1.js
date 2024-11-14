import mongoose from "mongoose";
import Articulos from "../models/articulos.js"

const httpArticulos = {

    //crear articulos
    postArticulo:async(req, res)=>{
        try {
            const { 
                nombre, precio, categoria, stock 
            } = req.body;
            const articulo = new Articulos({
                nombre,precio,categoria,stock
            });
            await articulo.save();
            res.json({ articulo });
        }catch(error){
            res.status(400).json({error:"Falla en la operación"})
            console.log(error)
        }
    },
    
    //modificar
    putArticuloM:async (req,res ) => {
        try{
            const {id} = req.params
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"ID no es valido"});};
            const {nombre,precio,categoria,stock,estado} = req.body;
            const articulo = await Articulos.findByIdAndUpdate(id,{nombre,precio,categoria,stock,estado},{new:true});  
                if(!articulo){
                    return res.status(404).json({error:"Movimiento no encontrado"})
                }
                res.json(articulo);
        }catch(error){
            res.status(400).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },

    //listar todos los articulos
    getArticulo: async (req, res) => {
        try {
            // Encuentra todos los artículos en la base de datos
            const articulo = await Articulos.find();
            res.json(articulo);  // Devuelve la lista de artículos en formato JSON
        } catch (error) {
            // Si ocurre un error, responde con un error 500
            console.error(error);
            res.status(500).json({ error: "Falla en la operación" });
        }
    },

    //listar por ID
    getArticuloById: async (req,res) => {
        try{
            const {id} = req.params;
            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });}
            const articulo = await Articulos.findById(id);
            if (!articulo) {
                return res.status(404).json({ error: "Articulo no encontrado" });}
            res.json({ articulo });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },


    // activar
    putActivar: async (req, res) => {
        try {
            const { id } = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const articulo = await Articulos.findByIdAndUpdate(id, { estado: "aprobado" }, { new: true });
            if (!articulo) {
                return res.status(404).json({ error: "movimiento no encontrado" });
            }
            res.json({ articulo });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // inactivar
     putInactivar: async (req, res) => {
        try {
            const { id } = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const articulo = await Articulos.findByIdAndUpdate(id, { estado: "anulado" },{ new: true });
            if (!articulo) {
                return res.status(404).json({ error: "articulo no encontrado" });
            }
            res.json({ articulo });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },


    // listar activos 
    getActivos:async (req, res) => {
        try {
            const activos = await Articulos.find({ estado: "aprobado" });
            
            if (!activos.length) {
                return res.status(404).json({ error: "No se encontraron movimientos aprobados" });
            }
    
            res.json({ activos });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

     // listar inactivos
     getInactivos:async (req, res) => {
        try {
            const inactivos = await Articulos.find({ estado: "anulado" });
            
            if (!inactivos.length) {
                return res.status(404).json({ error: "No se encontraron movimientos aprobados" });
            }
    
            res.json({ inactivos });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },




    // total inventario

    getTotalInventario: async (req, res) => {
        try {
            // Encuentra todos los artículos con estado 'activo'
            const articulosActivos = await Articulos.find({ estado: 'activo' });
    
            // Calcular el valor total del inventario
            const totalInventario = articulosActivos.reduce((total, articulo) => {
                return total + (articulo.precio * articulo.stock);
            }, 0);
    
            res.json({ totalInventario });
        } catch (error) {
            res.status(500).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },


    // get por categoria
    getArticulosConCategorias: async (req, res) => {
        try {
            // Busca los artículos y llena la información de la categoría
            const articulosConCategorias = await Articulos.find().populate('categoria');
            
            res.json(articulosConCategorias);
        } catch (error) {
            res.status(500).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    //get de articulos/stock debajo de X
    getArticulosPorStock: async (req, res) => {
        try {
            // Obtener el parámetro de stock máximo desde la URL
            const stockMaximo = parseInt(req.params.max);
    
            // Verificar si el parámetro es un número válido
            if (isNaN(stockMaximo)) {
                return res.status(400).json({ error: "El parámetro max debe ser un número válido" });
            }
    
            // Encontrar artículos con stock menor al valor máximo
            const articulos = await Articulos.find({ stock: { $lt: stockMaximo } });
    
            res.json(articulos);
        } catch (error) {
            res.status(500).json({ error: "Falla en la operación" });
            console.log(error);
        }
    }
    

}

export default httpArticulos
